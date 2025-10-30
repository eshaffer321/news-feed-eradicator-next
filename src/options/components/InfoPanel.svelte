<script>
import { onMount } from 'svelte';
import { createStore } from '../../store';
import { ActionType } from '../../store/action-types';
import { BackgroundActionType } from '../../background/store/action-types';
import SitesOptions from './SitesOptions.svelte';
import QuoteOptions from './QuoteOptions.svelte';
import About from './About.svelte';

let store;
let state;

onMount(() => {
    store = createStore();
    const update = () => state = store.getState();
    store.subscribe(update);
    update();
    store.dispatch({ type: ActionType.BACKGROUND_ACTION, action: { type: BackgroundActionType.FEATURE_INCREMENT } });
});

function visit(tab) {
    store.dispatch({ type: ActionType.UI_OPTIONS_TAB_SHOW, tab });
}
</script>

<div class="max-w-3xl mx-auto">
    <div class="space-y-6">
        <h3 class="text-center text-3xl font-semibold text-indigo-700">News Feed Eradicator</h3>
        <div class="flex justify-center space-x-6 border-b pb-2">
            <button
                type="button"
                class="text-lg pb-2 border-b-2 border-transparent hover:text-indigo-500 hover:border-indigo-300 transition-colors"
                class:text-indigo-600={state?.uiOptions.tab==='sites'}
                class:border-indigo-600={state?.uiOptions.tab==='sites'}
                on:click={() => visit('sites')}
            >Sites</button>
            <button
                type="button"
                class="text-lg pb-2 border-b-2 border-transparent hover:text-indigo-500 hover:border-indigo-300 transition-colors"
                class:text-indigo-600={state?.uiOptions.tab==='quotes'}
                class:border-indigo-600={state?.uiOptions.tab==='quotes'}
                on:click={() => visit('quotes')}
            >Quotes</button>
            <button
                type="button"
                class="text-lg pb-2 border-b-2 border-transparent hover:text-indigo-500 hover:border-indigo-300 transition-colors"
                class:text-indigo-600={state?.uiOptions.tab==='about'}
                class:border-indigo-600={state?.uiOptions.tab==='about'}
                on:click={() => visit('about')}
            >About</button>
        </div>
        <div class="bg-white shadow-md ring-1 ring-gray-200 rounded-xl p-6">
            {#if state?.uiOptions.tab === 'sites'}
                <SitesOptions {store} {state}/>
            {:else if state?.uiOptions.tab === 'quotes'}
                <QuoteOptions {store} {state}/>
            {:else}
                <About/>
            {/if}
        </div>
        <div class="text-center text-sm text-gray-500 mt-4">
            by <a href="http://west.io" class="underline hover:text-indigo-600">Jordan West</a>
            and
            <a href="https://github.com/jordwest/news-feed-eradicator/graphs/contributors" class="underline hover:text-indigo-600">contributors</a>
        </div>
    </div>
</div>
