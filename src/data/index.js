import { createClient } from '@supabase/supabase-js'

// 初始化memfiredb数据库实例

const supabaseJs2 = createClient(
    "https://cj7p10q5g6h0rqlbcl60.baseapi.memfiredb.com",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyOTI0NDU0NywiaWF0IjoxNjkxMzI0NTQ3LCJpc3MiOiJzdXBhYmFzZSJ9.8_QqAuys0lyhsCCBfqDh919lGpmIpWzzYxausRHgZZQ"
);


async function getPlayerInfo(column,val) {
    if(column == undefined) column = '';
    if(val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("playerinfo")
        .select()
        .order('id', { ascending: true })
        .eq(column, val);
    console.log("data"+data);
    return data;
}

async function getPropertyInfo_from_player(column,val) {
    if(column == undefined) column = '';
    if(val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("property_detail")
        .select()
        .order('id', { ascending: true })
        .in(column, val);
    console.log("data"+data);
    return data;
}

export{
    getPlayerInfo,
    getPropertyInfo_from_player
}