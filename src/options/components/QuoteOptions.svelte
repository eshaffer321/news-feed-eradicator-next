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
    <fieldset>
        <legend class="sr-only">Quote preferences</legend>
        <div class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
            <div class="relative flex gap-3 py-4">
                <div class="min-w-0 flex-1 text-sm">
                    <label for="show-quotes" class="font-medium text-gray-900 select-none">Show Quotes</label>
                </div>
                <div class="flex h-6 items-center">
                    <div class="group grid size-4 grid-cols-1">
                        <input
                            id="show-quotes"
                            type="checkbox"
class="peer col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            checked={store.getState().settings?.showQuotes}
                            on:change={toggleQuotes}
                        />
                        <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white peer-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                            <path class="opacity-0 peer-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path class="opacity-0 peer-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            {#if store.getState().settings?.showQuotes}
                <div class="relative flex gap-3 py-4">
                    <div class="min-w-0 flex-1 text-sm">
                        <label for="builtin-quotes" class="font-medium text-gray-900 select-none">Enable Built-in Quotes</label>
                    </div>
                    <div class="flex h-6 items-center">
                        <div class="group grid size-4 grid-cols-1">
                            <input
                                id="builtin-quotes"
                                type="checkbox"
class="peer col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                checked={store.getState().settings?.builtinQuotesEnabled}
                                on:change={toggleBuiltin}
                            />
                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white peer-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                <path class="opacity-0 peer-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="opacity-0 peer-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </fieldset>
</div>
