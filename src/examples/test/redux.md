Subscription.js -> createListenerCollection() -> notify()

useSelector.js -> useSelectorWithStoreAndSubscription() -> createSubscription() -> notifyNestedSubs()

Provider.js -> useIsomorphicLayoutEffect() -> subscription.trySubscribe()


Как я понял общая логика такова в Провайдаре вызывается useIsomorphicLayoutEffect если менятся ссылка на стор
далее внутри выполняется логика на сравнение предыдущего стора с текущем и если они не равны, то вызывается notifyNestedSubs,
который в себе имеет логику unstable батчинга. Так же нужно обратить внимание на subscription
там происходит вот такое присваение это нужно запомнить для дальнейшего (subscription.onStateChange = subscription.notifyNestedSubs)

в useSelector вызыввается useIsomorphicLayoutEffect и там происходят такие движения: 
subscription.onStateChange = checkForUpdates (по факту checkForUpdates это forceUpdate)
subscription.trySubscribe()

checkForUpdates()
