import{G as g,O as L,W as b,P as S,a as x,S as M,A as v,b as f,B as C,M as P,c as E}from"./vendor.7146fe46.js";const O=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}};O();let s;function A(e,t){return new L(e,t.domElement)}function F(){const e=new b({antialias:!0,physicallyCorrectLights:!0});return e.shadowMap.enabled=!0,e.shadowMap.type=S,e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio),e.setClearColor(0,1),document.body.append(e.domElement),e}function G(){const e=new x(36,window.innerWidth/window.innerHeight,.1,1e3);return e.lookAt(0,0,0),e.position.set(5,15,15),e}function R(){return new M}function W(){const e=new v(16777215,.5),t=new f(16777215,2),r=new f(16777215,2),i=new f(16777215,2);return t.position.set(10,10,-20),t.position.set(-20,10,0),i.position.set(10,10,20),t.castShadow=!0,[e,t,r,i]}function k(){m.update(),h.render(c,p)}function z(e,t){console.log("createCubes");const r=[];for(let i=0;i<e;i++){const n=t(),o=new C(n,n,n),a=new P({color:2236962}),d=new E(o,a);d.position.set(Math.random()*20-10,n/2,Math.random()*20-10),d.castShadow=!0,r.push(d)}return r}function u(){requestAnimationFrame(u),m.update(),N(),k()}function N(){for(let e=0;e<l.length;e++){const t=l[e],r=Math.random()*.02-.01,i=Math.random()*.02-.01;t.position.set(t.position.x+r,t.position.y,t.position.z+i)}}const h=F(),p=G(),c=R(),[q,B,D,H]=W(),K=new g,m=A(p,h),l=z(100,()=>Math.random()*2.5+.025);K.load("./bot-n-grnd-test-001.gltf",e=>{console.log(e.scene),s=e.scene.children[0],e.scene.children[0].children.forEach(t=>t.castShadow=!0),e.scene.children[1].receiveShadow=!0,e.scene.children[0].position.set(0,.2,0),c.castShadow=!0,c.add(e.scene),c.add(q,B,D,H,...l),u()});var w=.5,y=.75;document.addEventListener("keydown",j,!1);function j(e){console.log(e.which);var t=e.which;t==38?s.position.y+=y:t==40?(s.position.y-=y,s.position.y<.2&&(s.position.y=.2)):t==37?s.position.x-=w:t==39?s.position.x+=w:t==32&&s.position.set(0,.2,0)}