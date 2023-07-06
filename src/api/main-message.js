const HEART_TEST_MSG = 'keep-alive'
const REFRESH_MSG = 'refresh'
export default {
	methods: {
		closeSocket(webSocket) {
			if (webSocket && webSocket.readyState != 2 && webSocket.readyState != 3) {
				webSocket.close()
			}
		},
		handleShowMessageInfo(item) {
			this.currentMsgInfo = item
			this.showMessage = true
			//this.getMessageData()
		},
		handleMessageWs(responseURL, baseUrl) {
			// 如果要使用单独的url 可以根据环境模式来区分 if (process.env.NODE_ENV) {}
			if (!baseUrl) {
				let host = responseURL.split('/')[2]
				baseUrl = "ws://"+host+"/aserver"
				this.messageSocketUrl = baseUrl
			}
			if ("WebSocket" in window) {
				let url = baseUrl + "/message.ws/" + this.user.id
				const webSocket = new WebSocket(url)
				this.webSocket = webSocket
				webSocket.onopen = (event => {
					this.webSocketOpen(event)
				})
				webSocket.onmessage = (event => {
					// console.log(new Date().getTime() - data.getTime()  )
					this.webSocketMessage(event, webSocket)
				})
				webSocket.onclose = (event => {
					this.webSocketClose(webSocket,event)
					//如果因为其他原因断开了连接，将在十秒后发起重新连接
					// setTimeout(() => {
					// 	this.handleMessageWs(responseURL, baseUrl)
					// },1000) 
				})
				webSocket.onerror = (event => {
					this.webSocketError(webSocket, event)
					this.webSocketClose(webSocket,event)
				})
				//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				 window.onbeforeunload = () => {
					this.webSocketClose(this.websocket)

				}
			} else {
				this.$Notice.error({ title: '您的浏览器不支持获取消息' });
				return false
			}
		},
		sendWebSocketMsg(webSocket, message) {
		/* 	setTimeout(() => { */
				if (webSocket && webSocket.readyState === 1) {
					webSocket.send(message)
				} else {
					this.handleMessageWs(null, this.messageSocketUrl)
				}
		/* 	}, 5000) */
		},
		initMessage(page) {
			this.messagePage = Object.assign([], page)
		},
		webSocketOpen() {
			// console.log("开始连接")
		},
		webSocketMessage(event, webSocket) {
			this.initMessage(JSON.parse(event.data))
			this.sendWebSocketMsg(webSocket,HEART_TEST_MSG)
			//this.getMessageData()
		},
		webSocketClose(webSocket) {
			if (webSocket && webSocket.readyState != 2 && webSocket.readyState != 3) {
				webSocket.close()
			}
			// console.log("消息连接关闭")
		},
		webSocketError(websocket) {
			websocket.close()
			this.$Notice.error({ title: '消息获取失败' });
		},
		refreshMessage(userId) {
			if (userId) {
				this.sendWebSocketMsg(this.webSocket, "userId=" + userId)
			} else {
				this.sendWebSocketMsg(this.webSocket, REFRESH_MSG)
			}
		}
	},
	provide: function () {
		return {
			refreshMessage: this.refreshMessage
		}
	}
}