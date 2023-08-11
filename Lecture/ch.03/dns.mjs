import dns from 'dns/promises';

// IP 정보
const ip = await dns.lookup('cu.ac.kr');  
console.log('IP', ip);

// IPv4 주소
const a = await dns.resolve('cu.ac.kr', 'A');
console.log('A', a);

// 메일 서버
const mx = await dns.resolve('cu.ac.kr', 'MX');
console.log('MX', mx);

// 별칭, 주로 www가 붙은 주소는 별칭인 경우가 많다
const cname = await dns.resolve('www.cu.ac.kr', 'CNAME');
console.log('CNAME', cname);

// 나머지 정보
const any = await dns.resolve('cu.ac.kr', 'ANY');
console.log('ANY', any);