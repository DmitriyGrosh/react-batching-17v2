// let isBatchingUpdates: boolean = false;
//
// function performWorkOnRoot(
// 	root: FiberRoot,
// 	expirationTime: ExpirationTime,
// 	isYieldy: boolean,
// ) {
// 	invariant(
// 		!isRendering,
// 		'performWorkOnRoot was called recursively. This error is likely caused ' +
// 		'by a bug in React. Please file an issue.',
// 	);
//
// 	isRendering = true;
//
// 	// Check if this is async work or sync/expired work.
// 	if (!isYieldy) {
// 		// Flush work without yielding.
// 		// TODO: Non-yieldy work does not necessarily imply expired work. A renderer
// 		// may want to perform some work without yielding, but also without
// 		// requiring the root to complete (by triggering placeholders).
//
// 		let finishedWork = root.finishedWork;
// 		if (finishedWork !== null) {
// 			// This root is already complete. We can commit it.
// 			completeRoot(root, finishedWork, expirationTime);
// 		} else {
// 			root.finishedWork = null;
// 			// If this root previously suspended, clear its existing timeout, since
// 			// we're about to try rendering again.
// 			const timeoutHandle = root.timeoutHandle;
// 			if (timeoutHandle !== noTimeout) {
// 				root.timeoutHandle = noTimeout;
// 				// $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
// 				cancelTimeout(timeoutHandle);
// 			}
// 			renderRoot(root, isYieldy);
// 			finishedWork = root.finishedWork;
// 			if (finishedWork !== null) {
// 				// We've completed the root. Commit it.
// 				completeRoot(root, finishedWork, expirationTime);
// 			}
// 		}
// 	} else {
// 		// Flush async work.
// 		let finishedWork = root.finishedWork;
// 		if (finishedWork !== null) {
// 			// This root is already complete. We can commit it.
// 			completeRoot(root, finishedWork, expirationTime);
// 		} else {
// 			root.finishedWork = null;
// 			// If this root previously suspended, clear its existing timeout, since
// 			// we're about to try rendering again.
// 			const timeoutHandle = root.timeoutHandle;
// 			if (timeoutHandle !== noTimeout) {
// 				root.timeoutHandle = noTimeout;
// 				// $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
// 				cancelTimeout(timeoutHandle);
// 			}
// 			renderRoot(root, isYieldy);
// 			finishedWork = root.finishedWork;
// 			if (finishedWork !== null) {
// 				// We've completed the root. Check the if we should yield one more time
// 				// before committing.
// 				if (!shouldYieldToRenderer()) {
// 					// Still time left. Commit the root.
// 					completeRoot(root, finishedWork, expirationTime);
// 				} else {
// 					// There's no time left. Mark this root as complete. We'll come
// 					// back and commit it later.
// 					root.finishedWork = finishedWork;
// 				}
// 			}
// 		}
// 	}
//
// 	isRendering = false;
// }
//
// function runWithPriority(priorityLevel, eventHandler) {
// 	switch (priorityLevel) {
// 		case ImmediatePriority:
// 		case UserBlockingPriority:
// 		case NormalPriority:
// 		case LowPriority:
// 		case IdlePriority:
// 			break;
// 		default:
// 			priorityLevel = NormalPriority;
// 	}
//
// 	var previousPriorityLevel = currentPriorityLevel;
// 	var previousEventStartTime = currentEventStartTime;
// 	currentPriorityLevel = priorityLevel;
// 	currentEventStartTime = getCurrentTime();
//
// 	try {
// 		return eventHandler();
// 	} finally {
// 		currentPriorityLevel = previousPriorityLevel;
// 		currentEventStartTime = previousEventStartTime;
//
// 		// Before exiting, flush all the immediate work that was scheduled.
// 		flushImmediateWork();
// 	}
// }
//
// function performWork(minExpirationTime: ExpirationTime, isYieldy: boolean) {
// 	// Keep working on roots until there's no more work, or until there's a higher
// 	// priority event.
// 	findHighestPriorityRoot();
//
// 	if (isYieldy) {
// 		recomputeCurrentRendererTime();
// 		currentSchedulerTime = currentRendererTime;
//
// 		if (enableUserTimingAPI) {
// 			const didExpire = nextFlushedExpirationTime > currentRendererTime;
// 			const timeout = expirationTimeToMs(nextFlushedExpirationTime);
// 			stopRequestCallbackTimer(didExpire, timeout);
// 		}
//
// 		while (
// 			nextFlushedRoot !== null &&
// 			nextFlushedExpirationTime !== NoWork &&
// 			minExpirationTime <= nextFlushedExpirationTime &&
// 			!(didYield && currentRendererTime > nextFlushedExpirationTime)
// 			) {
// 			performWorkOnRoot(
// 				nextFlushedRoot,
// 				nextFlushedExpirationTime,
// 				currentRendererTime > nextFlushedExpirationTime,
// 			);
// 			findHighestPriorityRoot();
// 			recomputeCurrentRendererTime();
// 			currentSchedulerTime = currentRendererTime;
// 		}
// 	} else {
// 		while (
// 			nextFlushedRoot !== null &&
// 			nextFlushedExpirationTime !== NoWork &&
// 			minExpirationTime <= nextFlushedExpirationTime
// 			) {
// 			performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
// 			findHighestPriorityRoot();
// 		}
// 	}
//
// 	// We're done flushing work. Either we ran out of time in this callback,
// 	// or there's no more work left with sufficient priority.
//
// 	// If we're inside a callback, set this to false since we just completed it.
// 	if (isYieldy) {
// 		callbackExpirationTime = NoWork;
// 		callbackID = null;
// 	}
// 	// If there's work left over, schedule a new callback.
// 	if (nextFlushedExpirationTime !== NoWork) {
// 		scheduleCallbackWithExpirationTime(
// 			((nextFlushedRoot: any): FiberRoot),
// 			nextFlushedExpirationTime,
// 		);
// 	}
//
// 	// Clean-up.
// 	finishRendering();
// }
//
// function syncUpdates<A, B, C0, D, R>(
// 	fn: (A, B, C0, D) => R,
// 	a: A,
// 	b: B,
// 	c: C0,
// 	d: D,
// ): R {
// 	return runWithPriority(ImmediatePriority, () => {
// 		return fn(a, b, c, d);
// 	});
// }
//
// function performSyncWork() {
// 	performWork(Sync, false);
// }
//
// function flushSync<A, R>(fn: (a: A) => R, a: A): R {
// 	invariant(
// 		!isRendering,
// 		'flushSync was called from inside a lifecycle method. It cannot be ' +
// 		'called when React is already rendering.',
// 	);
// 	const previousIsBatchingUpdates = isBatchingUpdates;
// 	isBatchingUpdates = true;
// 	try {
// 		return syncUpdates(fn, a);
// 	} finally {
// 		isBatchingUpdates = previousIsBatchingUpdates;
// 		performSyncWork();
// 	}
// }

export {};
