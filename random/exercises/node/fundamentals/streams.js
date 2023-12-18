import {Readable, Writable} from 'node:stream'

class MultiplyByTenStream extends Writable{
    
}

class OneToHundredStrem extends Readable{
    idx = 1
    _read(){
        const i = this.idx++

        if (i >= 100){
            this.push(null)
        }else{
            const buff = Buffer.from(String(i))
            this.push(buff)
        }
    }
}

new OneToHundredStrem().pipe(process.stdout) 