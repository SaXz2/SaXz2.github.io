// Vercel Serverless Function
export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER || 'SaXz2';
  const GITHUB_REPO = process.env.GITHUB_REPO || 'private-gallery';
  const GITHUB_PATH = process.env.GITHUB_PATH || 'photos';
  
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: '服务器配置错误' });
  }
  
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error('获取图片列表失败');
    }
    
    const files = await response.json();
    
    // 过滤出图片文件
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
      .map(file => ({
        name: file.name,
        url: file.download_url,
        size: file.size
      }));
    
    res.status(200).json({ images });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '获取图片失败' });
  }
}
