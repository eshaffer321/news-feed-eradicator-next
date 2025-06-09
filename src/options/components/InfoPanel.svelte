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

<div class="nfe-info-panel">
    <div class="nfe-info-col v-stack-4">
        <h3 class="text-center">News Feed Eradicator</h3>
        <div class="flex justify-center h-stack-2">
            <a href="javascript:;" class="text-larger-1" class:strong={state?.uiOptions.tab==='sites'} on:click={() => visit('sites')}>Sites</a>
            <a href="javascript:;" class="text-larger-1" class:strong={state?.uiOptions.tab==='quotes'} on:click={() => visit('quotes')}>Quotes</a>
            <a href="javascript:;" class="text-larger-1" class:strong={state?.uiOptions.tab==='about'} on:click={() => visit('about')}>About</a>
        </div>
        <div class="shadow-mid bg-1 pad-3">
            {#if state?.uiOptions.tab === 'sites'}
                <SitesOptions {store}/>
            {:else if state?.uiOptions.tab === 'quotes'}
                <QuoteOptions {store}/>
            {:else}
                <About/>
            {/if}
        </div>
        <div class="text-center text-muted text-smaller-1">
            by <a href="http://west.io">Jordan West</a> and <a href="https://github.com/jordwest/news-feed-eradicator/graphs/contributors">contributors</a>
        </div>
    </div>
</div>
