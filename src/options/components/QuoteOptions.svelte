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

<div class="space-y-4">
    <h2 class="text-xl font-semibold">Quotes</h2>
    <label class="flex items-center space-x-2">
        <input
            type="checkbox"
            class="form-checkbox h-4 w-4 text-blue-600"
            checked={store.getState().settings?.showQuotes}
            on:change={toggleQuotes}
        />
        <span>Show Quotes</span>
    </label>
    {#if store.getState().settings?.showQuotes}
        <label class="flex items-center space-x-2">
            <input
                type="checkbox"
                class="form-checkbox h-4 w-4 text-blue-600"
                checked={store.getState().settings?.builtinQuotesEnabled}
                on:change={toggleBuiltin}
            />
            <span>Enable Built-in Quotes</span>
        </label>
    {/if}
</div>
