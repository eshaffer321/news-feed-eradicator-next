<script>
import { Sites } from '../../sites';
import { setSiteState } from '../../store/actions';
import { SettingsSiteStateTag } from '../../background/store/index';

let { store, state } = $props();

function toggle(id) {
    const current = state.settings?.sites[id];
    const next = current?.type === SettingsSiteStateTag.ENABLED ? { type: SettingsSiteStateTag.DISABLED } : { type: SettingsSiteStateTag.ENABLED };
    store.dispatch(setSiteState(id, next));
}
</script>

<div class="space-y-4">
    <h2 class="text-xl font-semibold">Sites</h2>
    <p class="text-gray-600">Choose sites below to enable News Feed Eradicator.</p>
    <fieldset>
        <legend class="sr-only">Site toggles</legend>
        <div class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
            {#each Object.entries(Sites) as [id, site]}
                <div class="relative flex gap-3 py-4">
                    <div class="min-w-0 flex-1 text-sm">
                        <label for={id} class="font-medium text-gray-900 select-none">{site.label}</label>
                    </div>
                    <div class="flex h-6 shrink-0 items-center">
                        <div class="grid size-4 grid-cols-1">
                            <input
                                id={id}
                                name={id}
                                type="checkbox"
                                class="peer col-start-1 row-start-1 size-4 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                checked={state?.settings?.sites[id]?.type === SettingsSiteStateTag.ENABLED}
                                onchange={() => toggle(id)}
                            />
                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white" viewBox="0 0 14 14" fill="none">
                                <path class="opacity-0 peer-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </fieldset>
</div>
