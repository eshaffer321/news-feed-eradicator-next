<script>
import { Sites } from '../../sites';
import { setSiteState } from '../../store/actions';
import { SettingsSiteStateTag } from '../../background/store/index';
export let store;

function toggle(id) {
    const current = store.getState().settings?.sites[id];
    const next = current?.type === SettingsSiteStateTag.ENABLED ? { type: SettingsSiteStateTag.DISABLED } : { type: SettingsSiteStateTag.ENABLED };
    store.dispatch(setSiteState(id, next));
}
</script>

<div class="space-y-4">
    <h2 class="text-xl font-semibold">Sites</h2>
    <p class="text-gray-600">Choose sites below to enable News Feed Eradicator.</p>
    <div class="space-y-2">
        {#each Object.entries(Sites) as [id, site]}
            <label class="flex items-center space-x-2">
                <input
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-blue-600"
                    checked={store.getState().settings?.sites[id]?.type === SettingsSiteStateTag.ENABLED}
                    on:change={() => toggle(id)}
                />
                <span>{site.label}</span>
            </label>
        {/each}
    </div>
</div>
