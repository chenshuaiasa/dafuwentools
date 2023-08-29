import store from '../store/index'

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient("https://cj7p10q5g6h0rqlbcl60.baseapi.memfiredb.com", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyOTI0NDU0NywiaWF0IjoxNjkxMzI0NTQ3LCJpc3MiOiJzdXBhYmFzZSJ9.8_QqAuys0lyhsCCBfqDh919lGpmIpWzzYxausRHgZZQ");

const channel1 = supabase
    .channel('playerinfo-changes')
    .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'playerinfo' },
        async function (payload) {
            await store.dispatch('asyncgetPlayerinfo');
            // console.log(payload.new);
            if (payload.new.id == store.state.playerid) {
                var id = store.state.playerid;
                var playerinfo = payload.new;
                // store.dispatch('asyncgetPlayerinfo',{_this:this})

                // await store.dispatch('asyncgetPropertyinfo');
                // store.commit('getPlayerinfo_now',{playerid:id});
                // store.commit('getPlayerInfo_now2', payload.new);\
                // console.log(payload.new);
                await store.dispatch('asyncgetp_i_o_now', payload.new);

                await store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [id], player: playerinfo });
                console.log('更新成功playerinfo')
                // asyncgetPropertyinfo_of_player
                // asyncgetPropertyinfo
                // console.log(payload)
            }
        })
    .subscribe()

const channel2 = supabase
    .channel('propertyinfo-changes')
    .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'property_detail' },
        async function (payload) {
            // var id = store.state.playerid;
            // var playerinfo = payload.new;
            // store.dispatch('asyncgetPlayerinfo',{_this:this})
            // await store.dispatch('asyncgetPlayerinfo');
            await store.dispatch('asyncgetPropertyinfo');
            // store.commit('getPlayerinfo_now',{playerid:id});
            // store.commit('getPlayerInfo_now2', payload.new);
            // await store.dispatch('asyncgetp_i_o_now', payload.new);
            // await store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [id], player: playerinfo });
            console.log('更新成功propertyinfo');
            // asyncgetPropertyinfo_of_player
            // asyncgetPropertyinfo
            // console.log(payload)
        })
    .subscribe();

const channel3 = supabase
    .channel('transferhis-changes')
    .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transfer_history' },
        async function (payload) {
            // var id = store.state.playerid;
            // var playerinfo = payload.new;
            // store.dispatch('asyncgetPlayerinfo',{_this:this})
            // await store.dispatch('asyncgetPlayerinfo');
            await store.dispatch('asyncgetTransferHistory');
            // store.commit('getPlayerinfo_now',{playerid:id});
            // store.commit('getPlayerInfo_now2', payload.new);
            // await store.dispatch('asyncgetp_i_o_now', payload.new);
            // await store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [id], player: playerinfo });
            console.log('更新成功transferhis')
            // asyncgetPropertyinfo_of_player
            // asyncgetPropertyinfo
            // console.log(payload)
        })
    .subscribe();
export {
    channel1,
    channel2,
    channel3
}