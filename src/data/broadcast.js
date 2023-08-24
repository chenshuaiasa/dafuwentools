import store from '../store/index'

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient("https://cj7p10q5g6h0rqlbcl60.baseapi.memfiredb.com", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyOTI0NDU0NywiaWF0IjoxNjkxMzI0NTQ3LCJpc3MiOiJzdXBhYmFzZSJ9.8_QqAuys0lyhsCCBfqDh919lGpmIpWzzYxausRHgZZQ");

const channel = supabase
    .channel('schema-db-changes')
    .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'playerinfo' },
        async function(payload) {
            if (payload.new.id == store.state.playerid) {
                var id = store.state.playerid;
                var playerinfo = store.state.playerinfo_now;
                // store.dispatch('asyncgetPlayerinfo',{_this:this})
                await store.dispatch('asyncgetPlayerinfo');
                await store.dispatch('asyncgetPropertyinfo');
                await store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id:[id],player:playerinfo});
                // store.commit('getPlayerinfo_now',{playerid:id});
                store.commit('getPlayerInfo_now2',payload.new);
                console.log('更新成功')
                // asyncgetPropertyinfo_of_player
                // asyncgetPropertyinfo
            }
            console.log(payload)
        })
    .subscribe()

export {
    channel
}