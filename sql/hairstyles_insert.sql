-- 发型数据插入脚本 for Supabase
-- 女款发型 (5个)

-- 1. 时尚波波头
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'female_01',
  '时尚波波头',
  'female',
  '/hairstyles/female_bob.jpg',
  'modern chin-length bob hairstyle with subtle layers, suitable for Asian women, clean and professional look, soft texture, natural black hair color'
);

-- 2. 浪漫大波浪
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'female_02',
  '浪漫大波浪',
  'female',
  '/hairstyles/female_waves.jpg',
  'romantic big waves hairstyle, shoulder-length hair with soft curls, elegant and feminine, suitable for special occasions, natural looking waves'
);

-- 3. 清新锁骨发
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'female_03',
  '清新锁骨发',
  'female',
  '/hairstyles/female_collarbone.jpg',
  'fresh collarbone-length hair with light layers, straight cut with slight inward curl at ends, modern and youthful, easy to maintain'
);

-- 4. 甜美公主切
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'female_04',
  '甜美公主切',
  'female',
  '/hairstyles/female_hime.jpg',
  'cute hime cut hairstyle with straight blunt bangs and cheek-length side layers, Japanese style, kawaii aesthetic, perfect for round face shapes'
);

-- 5. 气质低马尾
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'female_05',
  '气质低马尾',
  'female',
  '/hairstyles/female_low_pony.jpg',
  'elegant low ponytail hairstyle, hair gathered at nape of neck with soft face-framing strands, sophisticated and graceful, suitable for professional settings'
);

-- 男款发型 (5个)

-- 6. 清爽寸头
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'male_01',
  '清爽寸头',
  'male',
  '/hairstyles/male_buzz.jpg',
  'clean buzz cut hairstyle, very short hair evenly cut all over, masculine and low maintenance, suitable for active lifestyle'
);

-- 7. 时尚纹理烫
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'male_02',
  '时尚纹理烫',
  'male',
  '/hairstyles/male_texture.jpg',
  'trendy textured perm hairstyle, medium length hair with natural-looking waves and volume, modern Korean style, youthful and stylish'
);

-- 8. 经典油头
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'male_03',
  '经典油头',
  'male',
  '/hairstyles/male_pompadour.jpg',
  'classic pompadour hairstyle, hair swept back and up with volume on top, sides tapered short, vintage gentleman style, sophisticated'
);

-- 9. 阳光中分
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'male_04',
  '阳光中分',
  'male',
  '/hairstyles/male_center_part.jpg',
  'sunny center part hairstyle, medium length hair parted down the middle with soft waves, natural and casual, boy-next-door look'
);

-- 10. 个性飞机头
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES (
  'male_05',
  '个性飞机头',
  'male',
  '/hairstyles/male_mohawk.jpg',
  'edgy faux hawk hairstyle, hair styled upwards in the center with shorter sides, modern and bold, perfect for fashion-forward individuals'
);

-- 更新现有发型数据（如果需要替换原来的5个）
-- 如果你想保留原来的5个发型，可以注释掉下面的DELETE语句
-- DELETE FROM hairstyles WHERE id IN ('style_01', 'style_02', 'style_03', 'style_04', 'style_05');

-- 查询验证
SELECT id, name, gender, prompt FROM hairstyles ORDER BY gender, id;