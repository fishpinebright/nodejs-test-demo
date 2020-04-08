/*
遍历删除目录
 */

const path = require('path')
const fs = require('fs')


function traversalDir(pa){
	
	let files = fs.readdirSync(pa)
	files.forEach((item)=>{
		let secondPath = pa+item
		let stats =fs.statSync(secondPath)
		if(stats.isDirectory()){
			traversalDir(secondPath+'/')
		}else{
			fs.unlinkSync(secondPath)
		}		
	})
	fs.rmdirSync(pa)
}
let firstPath = path.join(__dirname,'test/')
traversalDir(firstPath)
