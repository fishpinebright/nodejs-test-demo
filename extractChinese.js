/*
提取目录下一些js文件的中文
 */

const path = require('path')
const fs = require('fs')

const reg = /["|'](.+)["|']/g
const z_reg = /.*[\u4e00-\u9fa5]+.*$/
function traversalDir(pa,outFile="test.js"){
	let files = fs.readdirSync(pa)
	files.forEach((item)=>{
		let secondPath = pa+item
		let stats =fs.statSync(secondPath)
		if(stats.isDirectory()){
			if(['node_modules','configs','utils','static','views'].includes(item)){
				return 
			}
			let pa1=path.dirname(pa)
			if(__dirname===pa1){
			let files = fs.readdirSync(pa)
			fs.appendFileSync(outFile,`${item}\n`,'utf8')					
			}		

			traversalDir(secondPath+'/')
		}else{
			extractChinese(secondPath,outFile)
		}		
	})
}

function extractChinese (pa,outFile){
	
	let extfile = path.extname(pa)
	if(['.js'].includes(extfile)){
		let data = fs.readFileSync(pa,'utf8')
		let str = data.match(reg)
		if(str!==null){
			let count = 0
			str.forEach((item)=>{
				if(z_reg.test(item)){
					count++
					let items = `${count}:${item}\n`
					fs.appendFileSync(outFile,items,'utf8')
				}
			})
		}
	}

}


let firstPath = path.join(__dirname,'koa2-test/')
traversalDir(firstPath)

