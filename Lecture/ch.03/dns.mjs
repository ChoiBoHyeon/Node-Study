import dns from 'dns/promises';

const ip = await dns.lookup('cu.ac.kr');
console.log('IP', ip);

const a = await dns.resolve('cu.ac.kr', 'A');
console.log('A', a);

const mx = await dns.resolve('cu.ac.kr', 'MX');
console.log('MX', mx);

const cname = await dns.resolve('www.cu.ac.kr', 'CNAME');
console.log('CNAME', cname);

const any = await dns.resolve('cu.ac.kr', 'ANY');
console.log('ANY', any);