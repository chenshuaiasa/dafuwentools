import { createClient } from '@supabase/supabase-js'

// 初始化memfiredb数据库实例

const supabaseJs2 = createClient(
    "https://cj7p10q5g6h0rqlbcl60.baseapi.memfiredb.com",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyOTI0NDU0NywiaWF0IjoxNjkxMzI0NTQ3LCJpc3MiOiJzdXBhYmFzZSJ9.8_QqAuys0lyhsCCBfqDh919lGpmIpWzzYxausRHgZZQ"
);


async function getPlayerInfo(column, val, colunms1) {
    if (column == undefined) column = '';
    if (val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("playerinfo")
        .select(colunms1)
        .order('id', { ascending: true })
        .eq(column, val);
    return data;
}

async function getPropertyInfo_from_player(column, val) {
    if (column == undefined) column = '';
    if (val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("property_detail")
        .select()
        .order('id', { ascending: true })
        .in(column, val);
    return data;
}

async function getTransferHis(column, val) {
    if (column == undefined) column = '';
    if (val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("transfer_history")
        .select()
        .order('id', { ascending: true })
        .in(column, val);
    return data;
}

async function insert_transfer_history(data) {
    const { error } = await supabaseJs2
        .from('transfer_history')
        .insert([data])
}

async function update_playerinfo(data,column,value) {
    const { error } = await supabaseJs2
        .from('playerinfo')
        .update(data)
        .eq(column,value)
}



function timeCode() {
    var nowdate = new Date();
    var year = nowdate.getFullYear(),
        month = nowdate.getMonth() + 1,
        date = nowdate.getDate(),
        h = nowdate.getHours(),
        m = nowdate.getMinutes(),
        s = nowdate.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i
}

export {
    getPlayerInfo,
    getPropertyInfo_from_player,
    insert_transfer_history,
    timeCode,
    update_playerinfo,
    getTransferHis
}