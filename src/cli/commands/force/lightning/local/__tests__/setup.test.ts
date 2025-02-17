/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import * as Config from '@oclif/config';
import { CommonUtils } from '@salesforce/lwc-dev-mobile-core/lib/common/CommonUtils';
import { RequirementProcessor } from '@salesforce/lwc-dev-mobile-core/lib/common/Requirements';
import { Setup } from '../setup';

const passedSetupMock = jest.fn(() => {
    return Promise.resolve();
});

describe('Setup Tests', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        jest.spyOn(CommonUtils, 'startCliAction').mockImplementation(() => {});
        jest.spyOn(RequirementProcessor, 'execute').mockImplementation(
            passedSetupMock
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Should route to Setup in lwc-dev-mobile-core', async () => {
        const setup = new Setup(
            ['-p', 'ios'],
            new Config.Config({} as Config.Options)
        );
        await setup.init();
        await setup.run();
        expect(passedSetupMock).toHaveBeenCalled();
    });
});
