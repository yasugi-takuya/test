import json

# ファイルパス
input_file = "常用漢字構造一覧(構造id版).txt"
output_file = "kanji_parts.json"

# 漢字ごとの構成情報を保持する辞書
kanji_parts_with_position = {}

# ファイルを読み込んで処理
with open(input_file, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue  # 空行をスキップ
        try:
            kanji, parts_raw = line.split("\t")
        except ValueError:
            print(f"スキップ: 行の形式が正しくありません -> {line}")
            continue

        parts = []
        for part in parts_raw.strip().split():
            if ":" not in part:
                continue  # 異常なデータをスキップ
            shape, position = part.split(":", 1)
            parts.append({
                "部品": shape,
                "位置": position
            })

        kanji_parts_with_position[kanji] = parts

# JSONとして保存
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(kanji_parts_with_position, f, ensure_ascii=False, indent=2)

print(f"JSONファイルを保存しました: {output_file}")
