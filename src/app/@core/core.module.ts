import { StatsProgressBarService } from './mock/stats-progress-bar.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { UserActivityData } from './data/user-activity';
import { TrafficListData } from './data/traffic-list';
import { EarningData } from './data/earning';
import { TrafficChartData } from './data/traffic-chart';

import { UserService } from './mock/users.service';
import { UserActivityService } from './mock/user-activity.service';
import { TrafficListService } from './mock/traffic-list.service';
import { EarningService } from './mock/earning.service';
import { TrafficChartService } from './mock/traffic-chart.service';
import { MockDataModule } from './mock/mock-data.module';
import { StatsProgressBarData } from './data/stats-progress-bar';
import { StatsBarService } from './mock/stats-bar.service';
import { StatsBarData } from './data/stats-bar';

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: StatsBarData, useClass: StatsBarService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
