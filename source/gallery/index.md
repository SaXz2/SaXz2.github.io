---
title: 私人相册
date: 2026-01-21 00:00:00
type: gallery
comments: false
password: 123456
abstract: 🔒 这是私人相册，需要密码才能查看
message: 请输入密码查看相册
---

<div id="gallery-container">
  <h2>我的相册 📸</h2>
  <div id="loading">加载中...</div>
  <div id="gallery-grid"></div>
</div>

<style>
#gallery-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

#loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

#gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.gallery-item .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.gallery-item:hover .overlay {
  transform: translateY(0);
}

.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  justify-content: center;
  align-items: center;
}

.lightbox.active {
  display: flex;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 40px;
  color: white;
  cursor: pointer;
  z-index: 10000;
}
</style>

<div id="lightbox" class="lightbox">
  <span class="lightbox-close">&times;</span>
  <img id="lightbox-img" src="" alt="">
</div>

<script>
// 配置信息
const GITHUB_CONFIG = {
  owner: 'SaXz2',  // 你的 GitHub 用户名
  repo: 'private-gallery',  // 私有仓库名
  path: 'photos',  // 图片文件夹路径
  token: 'YOUR_GITHUB_TOKEN_HERE'  // 你的 GitHub Token
};

// 获取私有仓库的图片列表
async function loadGallery() {
  const loading = document.getElementById('loading');
  const grid = document.getElementById('gallery-grid');
  
  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error('获取图片列表失败');
    }
    
    const files = await response.json();
    
    // 过滤出图片文件
    const images = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );
    
    if (images.length === 0) {
      loading.textContent = '暂无图片';
      return;
    }
    
    loading.style.display = 'none';
    
    // 渲染图片
    images.forEach(image => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      
      // 使用 download_url 获取图片（需要 token）
      const imgUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/main/${GITHUB_CONFIG.path}/${image.name}?token=${GITHUB_CONFIG.token}`;
      
      item.innerHTML = `
        <img src="${imgUrl}" alt="${image.name}" loading="lazy">
        <div class="overlay">
          <p>${image.name}</p>
        </div>
      `;
      
      // 点击放大
      item.onclick = () => openLightbox(imgUrl);
      
      grid.appendChild(item);
    });
    
  } catch (error) {
    console.error('加载相册失败:', error);
    loading.textContent = '加载失败，请检查配置';
  }
}

// 灯箱功能
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
}

// 绑定关闭事件
document.querySelector('.lightbox-close').onclick = closeLightbox;
document.getElementById('lightbox').onclick = (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
};

// 页面加载后执行
document.addEventListener('DOMContentLoaded', loadGallery);
</script>
