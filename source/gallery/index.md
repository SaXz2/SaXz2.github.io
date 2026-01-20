---
title: 我的私人相册
date: 2026-01-21 00:00:00
type: gallery
comments: false
---

<div id="gallery-container">
  <h2>我的私人相册 📸</h2>
  
  <!-- 文件夹选择区域 -->
  <div id="folder-selector" style="display: none;">
    <div class="folder-tabs" id="folder-tabs"></div>
  </div>
  
  <!-- Token 输入区域 -->
  <div id="token-input-area">
    <div class="token-form">
      <h3>🔑 请输入 GitHub Token</h3>
      <p class="hint">Token 仅在本地存储，不会上传到服务器</p>
      <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx" />
      <button id="load-gallery-btn">加载相册</button>
      <button id="clear-token-btn" class="secondary">清除已保存的 Token</button>
      <div class="config-hint">
        <p>💡 支持多文件夹相册</p>
        <p>在仓库根目录创建多个文件夹即可自动识别</p>
      </div>
    </div>
  </div>
  
  <div id="loading" style="display: none;">加载中...</div>
  <div id="gallery-grid"></div>
</div>

<style>
#gallery-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

#token-input-area {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.token-form {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.token-form h3 {
  margin-bottom: 10px;
  color: #333;
}

.token-form .hint {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.token-form .config-hint {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #999;
}

.token-form .config-hint p {
  margin: 5px 0;
}

.token-form input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.token-form input:focus {
  outline: none;
  border-color: #49B1F5;
}

.token-form button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 10px;
}

#load-gallery-btn {
  background: #49B1F5;
  color: white;
}

#load-gallery-btn:hover {
  background: #3a9de0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(73, 177, 245, 0.3);
}

#clear-token-btn {
  background: #f5f5f5;
  color: #666;
}

#clear-token-btn:hover {
  background: #e0e0e0;
}

/* 文件夹选择器 */
#folder-selector {
  margin: 30px 0;
}

.folder-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.folder-tab {
  padding: 12px 24px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-tab:hover {
  border-color: #49B1F5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.folder-tab.active {
  background: #49B1F5;
  color: white;
  border-color: #49B1F5;
}

.folder-tab .count {
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.folder-tab.active .count {
  background: rgba(255,255,255,0.3);
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

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 50px;
  color: white;
  cursor: pointer;
  padding: 20px;
  user-select: none;
  z-index: 10000;
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}

.lightbox-nav:hover {
  color: #49B1F5;
}

.error-message {
  color: #ff4757;
  margin-top: 10px;
  font-size: 14px;
}

.empty-folder {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}
</style>

<div id="lightbox" class="lightbox">
  <span class="lightbox-close">&times;</span>
  <span class="lightbox-nav lightbox-prev">‹</span>
  <span class="lightbox-nav lightbox-next">›</span>
  <img id="lightbox-img" src="" alt="">
</div>

<script>
// GitHub 配置（不含 token）
const GITHUB_CONFIG = {
  owner: 'SaXz2',
  repo: 'private-gallery',
  path: ''  // 留空表示仓库根目录，会自动扫描所有文件夹
};

// LocalStorage 键名
const TOKEN_STORAGE_KEY = 'github_gallery_token';

// 全局变量
let allFolders = [];
let currentFolder = null;
let currentImages = [];
let currentImageIndex = 0;
let currentToken = ''; // 保存当前使用的 token

// 创建带 token 的图片 URL
function getAuthenticatedImageUrl(image) {
  // 使用 GitHub Raw URL 格式，通过 Authorization header 访问
  // 但由于浏览器限制，我们使用 download_url 并通过 fetch 转换为 blob URL
  return image.download_url;
}

// 加载图片并转换为 blob URL（用于私有仓库）
async function loadImageAsBlob(url, token) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to load image');
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
}

// 页面加载时检查是否已保存 token
document.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (savedToken) {
    document.getElementById('github-token').value = savedToken;
    // 自动加载相册
    loadGalleryWithToken(savedToken);
  }
  
  // 绑定按钮事件
  document.getElementById('load-gallery-btn').onclick = handleLoadGallery;
  document.getElementById('clear-token-btn').onclick = handleClearToken;
  
  // 回车键加载
  document.getElementById('github-token').onkeypress = (e) => {
    if (e.key === 'Enter') handleLoadGallery();
  };
});

// 处理加载相册
function handleLoadGallery() {
  const token = document.getElementById('github-token').value.trim();
  
  if (!token) {
    showError('请输入 GitHub Token');
    return;
  }
  
  if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
    showError('Token 格式不正确，应该以 ghp_ 或 github_pat_ 开头');
    return;
  }
  
  // 保存到 localStorage
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  
  // 加载相册
  loadGalleryWithToken(token);
}

// 清除保存的 token
function handleClearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  document.getElementById('github-token').value = '';
  location.reload();
}

// 显示错误信息
function showError(message) {
  let errorDiv = document.querySelector('.error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    document.querySelector('.token-form').appendChild(errorDiv);
  }
  errorDiv.textContent = message;
  setTimeout(() => errorDiv.remove(), 3000);
}

// 使用 token 加载相册（扫描所有文件夹）
async function loadGalleryWithToken(token) {
  currentToken = token; // 保存 token
  const tokenArea = document.getElementById('token-input-area');
  const loading = document.getElementById('loading');
  const folderSelector = document.getElementById('folder-selector');
  
  // 隐藏输入框，显示加载中
  tokenArea.style.display = 'none';
  loading.style.display = 'block';
  loading.textContent = '正在扫描相册文件夹...';
  
  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token 无效或已过期');
      } else if (response.status === 404) {
        throw new Error('仓库不存在');
      }
      throw new Error('获取文件夹列表失败');
    }
    
    const items = await response.json();
    
    // 找出所有文件夹
    const folders = items.filter(item => item.type === 'dir');
    
    if (folders.length === 0) {
      throw new Error('仓库中没有找到文件夹，请先创建文件夹并上传图片');
    }
    
    // 加载每个文件夹的图片数量
    allFolders = await Promise.all(
      folders.map(async folder => {
        const images = await loadFolderImages(token, folder.path);
        return {
          name: folder.name,
          path: folder.path,
          images: images,
          count: images.length
        };
      })
    );
    
    // 过滤掉空文件夹
    allFolders = allFolders.filter(f => f.count > 0);
    
    if (allFolders.length === 0) {
      throw new Error('所有文件夹都是空的，请上传图片');
    }
    
    loading.style.display = 'none';
    
    // 显示文件夹选择器
    renderFolderTabs();
    folderSelector.style.display = 'block';
    
    // 默认显示第一个文件夹
    switchFolder(allFolders[0]);
    
  } catch (error) {
    console.error('加载相册失败:', error);
    loading.style.display = 'none';
    tokenArea.style.display = 'flex';
    showError(error.message || '加载失败，请检查 Token 和配置');
    
    // 如果是 token 问题，清除保存的 token
    if (error.message.includes('Token')) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      document.getElementById('github-token').value = '';
    }
  }
}

// 加载指定文件夹的图片
async function loadFolderImages(token, folderPath) {
  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${folderPath}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) return [];
  
  const files = await response.json();
  
  // 过滤出图片文件
  return files.filter(file => 
    file.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
  );
}

// 渲染文件夹标签
function renderFolderTabs() {
  const tabsContainer = document.getElementById('folder-tabs');
  tabsContainer.innerHTML = '';
  
  allFolders.forEach(folder => {
    const tab = document.createElement('div');
    tab.className = 'folder-tab';
    tab.innerHTML = `
      📁 ${folder.name}
      <span class="count">${folder.count}</span>
    `;
    tab.onclick = () => switchFolder(folder);
    tabsContainer.appendChild(tab);
  });
}

// 切换文件夹
function switchFolder(folder) {
  currentFolder = folder;
  currentImages = folder.images;
  
  // 更新标签状态
  document.querySelectorAll('.folder-tab').forEach((tab, index) => {
    tab.classList.toggle('active', index === allFolders.indexOf(folder));
  });
  
  // 渲染图片
  renderGallery();
}

// 渲染图片网格
async function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  
  if (currentImages.length === 0) {
    grid.innerHTML = '<div class="empty-folder">📭 这个文件夹是空的</div>';
    return;
  }
  
  // 为每张图片创建元素并加载
  for (let index = 0; index < currentImages.length; index++) {
    const image = currentImages[index];
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    // 创建占位符
    item.innerHTML = `
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250'%3E%3Crect fill='%23f0f0f0' width='300' height='250'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='14'%3E加载中...%3C/text%3E%3C/svg%3E" alt="${image.name}" loading="lazy">
      <div class="overlay">
        <p>${image.name}</p>
      </div>
    `;
    
    grid.appendChild(item);
    
    // 异步加载真实图片
    loadImageAsBlob(image.download_url, currentToken).then(blobUrl => {
      if (blobUrl) {
        const img = item.querySelector('img');
        img.src = blobUrl;
        // 点击放大
        item.onclick = () => openLightbox(index);
      }
    });
  }
}

// 灯箱功能
function openLightbox(index) {
  currentImageIndex = index;
  showLightboxImage();
  
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  
  // 绑定键盘事件
  document.addEventListener('keydown', handleLightboxKeyboard);
}

async function showLightboxImage() {
  const img = document.getElementById('lightbox-img');
  const image = currentImages[currentImageIndex];
  
  // 显示加载状态
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="14"%3E加载中...%3C/text%3E%3C/svg%3E';
  
  // 加载真实图片
  const blobUrl = await loadImageAsBlob(image.download_url, currentToken);
  if (blobUrl) {
    img.src = blobUrl;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.removeEventListener('keydown', handleLightboxKeyboard);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  showLightboxImage();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  showLightboxImage();
}

function handleLightboxKeyboard(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
}

// 绑定关闭事件
document.querySelector('.lightbox-close').onclick = closeLightbox;
document.querySelector('.lightbox-prev').onclick = prevImage;
document.querySelector('.lightbox-next').onclick = nextImage;
document.getElementById('lightbox').onclick = (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
};
</script>
