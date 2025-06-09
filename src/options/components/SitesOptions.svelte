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

<div class="v-stack-2">
    <h2>Sites</h2>
    <p>Choose sites below to enable News Feed Eradicator.</p>
    <div class="v-stack">
        {#each Object.entries(Sites) as [id, site]}
            <label class="h-stack">
                <input type="checkbox" checked={store.getState().settings?.sites[id]?.type === SettingsSiteStateTag.ENABLED} on:change={() => toggle(id)} />
                {site.label}
            </label>
        {/each}
    </div>
</div>
