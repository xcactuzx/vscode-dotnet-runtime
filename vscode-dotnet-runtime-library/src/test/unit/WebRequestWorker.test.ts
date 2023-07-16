/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as chai from 'chai';
import { suite, test } from 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import {
    MockEventStream,
    MockExtensionContext,
    TrackingWebRequestWorker,
} from '../mocks/MockObjects';
import { expect } from 'chai';
const assert = chai.assert;
chai.use(chaiAsPromised);

suite('WebRequestWorker Unit Tests', () => {
    function getTestContext(): [MockEventStream, MockExtensionContext] {
        const context = new MockExtensionContext();
        const eventStream = new MockEventStream();
        return [eventStream, context];
    }

    test('Web Requests Memoized on Repeated calls', async () => {
        const [eventStream, context] = getTestContext();
<<<<<<< HEAD

        const acquisitionWorker = new DotnetCoreAcquisitionWorker({
            storagePath: '',
            extensionState: context,
            eventStream,
            acquisitionInvoker: new ErrorAcquisitionInvoker(eventStream),
            installationValidator: new MockInstallationValidator(eventStream),
            timeoutValue: 10,
            installDirectoryProvider: new RuntimeInstallationDirectoryProvider(''),
        });
        return assert.isRejected(acquisitionWorker.acquireRuntime('1.0'), Error, '.NET Acquisition Failed');
    });

    test('Install Script Request Failure', async () => {
        const [eventStream, context] = getTestContext();
        const installScriptWorker: IInstallScriptAcquisitionWorker = new MockInstallScriptWorker(context, eventStream, true);
        return assert.isRejected(installScriptWorker.getDotnetInstallScriptPath(), Error, 'Failed to Acquire Dotnet Install Script').then(() => {
            assert.exists(eventStream.events.find(event => event instanceof DotnetInstallScriptAcquisitionError));
        });
    });

    test('Install Script Request Failure With Fallback Install Script', async () => {
        const [eventStream, context] = getTestContext();
        const installScriptWorker: IInstallScriptAcquisitionWorker = new MockInstallScriptWorker(context, eventStream, true, true);
        const scriptPath = await installScriptWorker.getDotnetInstallScriptPath();
        assert.equal(scriptPath, path.join(__dirname, '..'));
        assert.exists(eventStream.events.find(event => event instanceof DotnetInstallScriptAcquisitionError));
        assert.exists(eventStream.events.find(event => event instanceof DotnetFallbackInstallScriptUsed));
    });

    test('Install Script File Manipulation Failure', async () => {
        const [eventStream, context] = getTestContext();
        const installScriptWorker: IInstallScriptAcquisitionWorker = new MockInstallScriptWorker(context, eventStream, true);
        return assert.isRejected(installScriptWorker.getDotnetInstallScriptPath(), Error, 'Failed to Acquire Dotnet Install Script').then(() => {
            assert.exists(eventStream.events.find(event => event instanceof DotnetInstallScriptAcquisitionError));
        });
    });

    test('Web Requests Memoized on Repeated Installs', async () => {
        const [eventStream, context] = getTestContext();
        const webWorker = new MockWebRequestWorker(context, eventStream, '', 'MockKey');

=======
        const webWorker = new TrackingWebRequestWorker(context, eventStream, 'https://microsoft.com');
>>>>>>> origin/cleanups
        // Make a request to cache the data
        await webWorker.getCachedData(0);
        const requests = [];
        for (let i = 0; i < 10; i++) {
            requests.push(webWorker.getCachedData(0));
        }
        const results = await Promise.all(requests);
        const expected = results[0];
        for (let request of results) {
            assert.equal(request, expected);
        }
        const requestCount = webWorker.getRequestCount();
        assert.isBelow(requestCount, requests.length);
    });

    test('Web requests are stored in cache', async () => {
        const [eventStream, context] = getTestContext();
        const webWorker = new TrackingWebRequestWorker(context, eventStream, 'https://microsoft.com');
        // Make a request to cache the data
        let stateKey = context.keys().filter(k => k.startsWith("axios-cache"))[0];
        await Promise.all ([
            webWorker.getCachedData(0),
            webWorker.getCachedData(0),
            webWorker.getCachedData(0) ]);
        assert.isDefined(stateKey);
        let state = context.get(stateKey);
        assert.isDefined(state);
    });
});
