import{O as L,A as v,P as S,T as f,S as u,a as p,G as C,M as O,W as A,b as E,c as M}from"./vendor.d7bcfa3a.js";const P=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}};P();var x="assets/bact.8e9c03f0.png",H="assets/Circ001.7f548d8c.png";const{randFloat:o,randInt:T}=O;function I(){const e=new A({antialias:!0});return e.setSize(window.innerWidth,window.innerHeight),e.setClearColor(11537014,1),document.body.append(e.domElement),e}function W(){const e=new E(75,window.innerWidth/window.innerHeight,.1,1e3);return e.lookAt(0,0,0),e.position.set(0,10,0),e}function z(){return new M}function F(){w.render(s,b)}function m(){window.requestAnimationFrame(m),G.update(),a.forEach(e=>{e.position.z+=o(-.025,.025)}),d.forEach(e=>{e.position.z+=o(-.025,.025)}),F()}const w=I(),b=W(),s=z(),G=new L(b,w.domElement),N=new v(16777215,.25),h=new S(11154176,2);h.position.set(10,20,5);s.add(N,h);const g={circ1:new f().load(H),bact:new f().load(x)},y={circ1:new u({map:g.circ1}),bact:new u({map:g.bact})},a=[];for(let e=0;e<200;e++){const n=new p(y.circ1);n.position.set(o(-10,10),o(-1,1),o(-10,10));const i=o(.5,4);n.scale.set(i,i,i),a.push(n)}s.add(...a);const q=new C(10,10);s.add(q);const d=[];for(let e=0;e<50;e++){const n=new p(y.bact);n.position.set(o(-10,10),o(0,2),o(-10,10));const i=o(.5,4);n.scale.set(i,i,i),d.push(n)}s.add(...d);m();