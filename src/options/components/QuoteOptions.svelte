<script>
import { BackgroundActionType } from '../../background/store/action-types';
import { ActionType } from '../../store/action-types';
export let store;

function toggleQuotes() {
    store.dispatch({ type: ActionType.BACKGROUND_ACTION, action: { type: BackgroundActionType.QUOTES_SHOW_TOGGLE } });
}
function toggleBuiltin() {
    store.dispatch({ type: ActionType.BACKGROUND_ACTION, action: { type: BackgroundActionType.QUOTES_BUILTIN_TOGGLE } });
}
</script>

<div class="v-stack-2">
    <h2>Quotes</h2>
    <label>
        <input type="checkbox" checked={store.getState().settings?.showQuotes} on:change={toggleQuotes} />
        Show Quotes
    </label>
    {#if store.getState().settings?.showQuotes}
        <label>
            <input type="checkbox" checked={store.getState().settings?.builtinQuotesEnabled} on:change={toggleBuiltin} />
            Enable Built-in Quotes
        </label>
    {/if}
</div>
