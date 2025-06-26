import json

# ▼ ファイル名
IDIOMS_FILE = "yojijukugo_muzukasii.json"  # 四字熟語のデータ
KANJI_PARTS_FILE = "kanji_parts.json"   # 漢字の構成データ
OUTPUT_FILE = "yojijukugo_hard.json"  # 出力先ファイル名

# ▼ 四字熟語データと構成データを読み込み
with open(IDIOMS_FILE, "r", encoding="utf-8") as f:
    idioms = json.load(f)

with open(KANJI_PARTS_FILE, "r", encoding="utf-8") as f:
    kanji_parts_dict = json.load(f)

# ▼ 四字熟語と構成漢字を結合
enriched_idioms = []

for idiom in idioms:
    enriched_kanji_list = []
    for kanji, yomi in idiom["構成漢字"]:
        enriched_kanji_list.append({
            "漢字": kanji,
            "読み": yomi,
            "構成": kanji_parts_dict.get(kanji, [])  # データがなければ空
        })
    
    enriched_idioms.append({
        "熟語": idiom["熟語"],
        "読み方": idiom["読み方"],
        "意味": idiom["意味"],
        "構成漢字": enriched_kanji_list
    })

# ▼ 統合結果を保存
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(enriched_idioms, f, ensure_ascii=False, indent=2)

print(f"✅ 統合完了: {OUTPUT_FILE}")
