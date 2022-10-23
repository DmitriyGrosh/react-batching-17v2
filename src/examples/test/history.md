далее она используется = ->
// 0.4.0
Updates to your component are batched now, which may result in a significantly faster re-render of components.
this.setState now takes an optional callback as it's second parameter.
If you were using onClick={this.setState.bind(this, state)} previously,
you'll want to make sure you add a third parameter so that the event is not treated as the callback.

в файле ReactUpdates.js есть функция batchedUpdates -> 
в файле ReactEventEmitter.js в методе handleTopLevel ->
в файле ReactEventTopLevelCallback.js в методе createTopLevelCallback ->
в файле ReactEventEmitter.js в методе trapBubbledEvent и trapCapturedEvent -> 
в файле ReactEventEmitter.js в методе listenAtTopLevel ->
в файле ReactEventEmitter.js в методе ensureListening ->
в файле ReactMount.js в методе prepareTopLevelEvents ->
// здесь ужи начинается интересное в доке говорится, что это метод нужен для
// регистрация компонент в массиве всех компонентов
в файле ReactMount.js в методе _registerComponent ->
в файле ReactMount.js в методе __renderNewRootComponent ->
в файле ReactMount.js в методе renderComponent

// здесь наверное можно остановиться я сильно не стал разбираться в каждой из этих функций но можно просделить 
четкую логику того, что в 4 реакте первый раз добавили логигку батчинга событий и по факту можно говрить что батчинг существует с 4 версии
по факту в функциях trapBubbledEvent и trapCapturedEvent они реализуют кейсы когда будут вызываться батчинг
далее они просто будут увеличивать колличесвто этих кейсов для батчинга


// 0.11.0
Re-renders are batched in more cases

по факту в этой версии они увеличили колличесвто кейсов батчинга

// 0.12.0
React.addons.batchedUpdates added to API for hooking into update cycle

// обратил внимание что уже в этой версии появился flushBatchedUpdates но пока flushSync никого нет 

ReactWithAddons.js в методе ReactUpdates.batchedUpdates

по большому не увидел на что это вляет видно что по сравнению с 4 версии есть отличие в метода батчинга
но логика такая же используется при всплытии и погружении 

// 0.13.0
Calls to setState in life-cycle methods are now always batched and therefore asynchronous.
Previously the first call on the first mount was synchronous.

как я понял здесь они добавили возможность для разработчиков использовать функцию bathedUpdates

// 0.14.0
Addons have been moved to separate packages 
(react-addons-clone-with-props, react-addons-create-fragment, react-addons-css-transition-group, react-addons-linked-state-mixin, react-addons-perf, react-addons-pure-render-mixin, react-addons-shallow-compare, react-addons-test-utils, react-addons-transition-group, react-addons-update,
ReactDOM.unstable_batchedUpdates).

а здесь по факту ту функцию, которую они добавили в addons, вынесли в react-dom и мы получили unstable_batchUpdates
то есть можно сказать, что самый первый unstable_batchUpdates был добавлен в 13 версии, а не в 14

// 15.0.0
Deprecated addons are removed: batchedUpdates and cloneWithProps. (@jimfb in #5859, @zpao in #6016)

все понятно, почистили ненужные функции для батчинга

// 15.0.2
React Perf Add-on
Ignore DOM operations that occur outside the batch operation. (@gaearon in #6516)

// 15.1.0
Fix a batching bug resulting in some lifecycle methods incorrectly being called multiple times. (@sophiebits in #6650)

в этом комите видно что процесс батчинга это практически просто смена флага вместе с колличесвтом рендеров

// 15.3.0
Downgrade "unexpected batch number" invariant to a warning. (@sophiebits in #7133)

// 15.4.0
The unstable batchedUpdates API now passes the wrapped function's return value through. (@bgnorlov in #7444)

// 15.5.4
Fix compatibility with Enzyme by exposing batchedUpdates on shallow renderer. (@gaearon in 9382)

// 16.0.0
Shallow renderer does not implement unstable_batchedUpdates() anymore.
ReactDOM.unstable_batchedUpdates now only takes one extra argument after the callback.

сделил так чтобы можно было возвращать только callback 

по коду увидел что в версии 16.3 уже сущесьвет flushSync, в 15.5.4 его еще не было
но так как 16.0.0 нет на гите будем предпологать что его добавили в 16.3

// 16.8.0
Add ReactTestRenderer.act() and ReactTestUtils.act() for batching updates so that tests more closely match real behavior. (@threepointone in #14744)

стали тестить кейсы для батчинга в функциональных компонетах

// 17.0.0
Revamp the priority batching heuristics. (@acdlite in #18796)
Allow calling ReactDOM.flushSync during lifecycle methods (but warn). (@sebmarkbage in #18759)

реально поменяли приоритеты для батчинга, грубо говоря, там поменяли ENUMS для батчинга 

если поскать по версиям можно увидеть, что раньше было что-то BATCHED_UPDATES, RESET_BATCHED_UPDATES и FLUSH_BATCHED_UPDATES
и это было какой-то стратегией, а сейчас они меняют флаг isBatching


// 18.0.0
Make act batch updates. (#21797 by @acdlite)
Automatic batching: This release introduces a performance improvement that changes to the way React batches updates to do more batching automatically.
See Automatic batching for fewer renders in React 18 for more info. In the rare case that you need to opt out, wrap the state update in flushSync.

