var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        musicURL: "",
        picUrl: "",
        hotComments: [],
        isPlaying: false,
        mvUrl: "",
        isShow: false,
    },
    methods: {
        /*
          1:歌曲搜索接口
            请求地址:https://autumnfish.cn/search
            请求方法:get
            请求参数:keywords(查询关键字)
            响应内容:歌曲搜索结果
        */
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
                response => {
                    that.musicList = response.data.result.songs;
                }, error => console.error(error)
            )
        },
        playMusic: function (musicID) {
            /*
              2:歌曲url获取接口
                请求地址:https://autumnfish.cn/song/url
                请求方法:get
                请求参数:id(歌曲id)
                响应内容:歌曲url地址
            */
            axios.get("https://autumnfish.cn/song/url?id=" + musicID).then(
                response => {
                    this.musicURL = response.data.data[0].url
                }, error => console.error(error)
            )
            /*
           3.歌曲详情获取
             请求地址:https://autumnfish.cn/song/detail
             请求方法:get
             请求参数:ids(歌曲id)
             响应内容:歌曲详情(包括封面信息)
           */
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicID).then(
                response => {
                    this.picUrl = response.data.songs[0].al.picUrl;
                }, error => console.error(error)
            )
            /*
              4.热门评论获取
                请求地址:https://autumnfish.cn/comment/hot?type=0
                请求方法:get
                请求参数:id(歌曲id,地址中的type固定为0)
                响应内容:歌曲的热门评论
            */
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicID).then(
                response => {
                    this.hotComments = response.data.hotComments
                }, error => console.error(error)
            )

        },
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        },
        /*
          5.mv地址获取
            请求地址:https://autumnfish.cn/mv/url
            请求方法:get
            请求参数:id(mvid,为0表示没有mv)
            响应内容:mv的地址
        */
        playMV: function (mvid) {
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                response => {
                    this.isShow = true
                    this.mvUrl = response.data.data.url
                }, error => console.error(error)
            );
        },
        hide: function () {
            this.isShow = false
        }
    }
})