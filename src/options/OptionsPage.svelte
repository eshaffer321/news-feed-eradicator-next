<script>
import { onMount } from 'svelte';
import { createStore } from '../store/index';
import InfoPanel from '../components/info-panel';
import { init } from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import attrsModule from 'snabbdom/modules/attributes';
import eventsModule from 'snabbdom/modules/eventlisteners';
import { toVNode } from 'snabbdom/tovnode';
import { ActionType } from '../store/action-types';
import { BackgroundActionType } from '../background/store/action-types';
import { SECOND } from '../lib/time';

let container;

onMount(() => {
        const store = createStore();
        const patch = init([propsModule, attrsModule, eventsModule]);
        let vnode = toVNode(container);

        store.dispatch({
                type: ActionType.BACKGROUND_ACTION,
                action: { type: BackgroundActionType.FEATURE_INCREMENT },
        });

        const render = () => {
                const newVnode = InfoPanel(store);
                patch(vnode, newVnode);
                vnode = newVnode;
        };
        store.subscribe(render);

        setInterval(() => {
                const state = store.getState();
                if (state.uiOptions.tab === 'sites') render();
        }, 30 * SECOND);

        render();
});
</script>

<div bind:this={container} id="options-container"></div>
