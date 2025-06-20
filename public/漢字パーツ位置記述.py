import re

# "使   ⿰亻吏" のような形で漢字とその構造が記載されている
kanji_kouzou_kigou_file = open(r"/workspaces/test/public/常用漢字構造一覧(構造記号版).txt", 'r', encoding='UTF-8')
kanji_kouzou_id_file = open(r"/workspaces/test/public/常用漢字構造一覧(構造id版).txt", 'w', encoding='UTF-8')
kanji_kouzou_kigou_list = kanji_kouzou_kigou_file.read().splitlines()  # 漢字構造一覧のリスト
kouzou_list = ["⿰", "⿱", "⿲", "⿳", "⿴", "⿵", "⿶", "⿷", "⿸", "⿹", "⿺", "⿻", "⿼", "⿽"]
kanji_kouzou_id_list = []  # 常用漢字の構造一覧のリスト

for kanji_kouzous in kanji_kouzou_kigou_list:  # "使    ⿰亻吏" のような漢字と漢字構造の文字列をリストから取得
    kanji_kouzous = kanji_kouzous.split()  # スペースで分割し漢字と漢字構造のリストにする(["使", "⿰亻吏"] のような形)
    if len(kanji_kouzous[1]) == 1:
        kanji_kouzous[1] = kanji_kouzous[1][0] + ":single"
    elif len(kanji_kouzous[1]) == 3:
        if kanji_kouzous[1][0] == "⿰":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":Left    " + kanji_kouzous[1][2] + ":Right"
        elif kanji_kouzous[1][0] == "⿱":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":Top    " + kanji_kouzous[1][2] + ":Bottom"
        elif kanji_kouzous[1][0] == "⿻":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":Center    " + kanji_kouzous[1][2] + ":Center"
        elif kanji_kouzous[1][0] == "⿴":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":Outside    " + kanji_kouzous[1][2] + ":Inside"
        elif kanji_kouzous[1][0] == "⿵":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":TopOutside    " + kanji_kouzous[1][2] + ":BottomInside"
        elif kanji_kouzous[1][0] == "⿶":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":BottomOutside    " + kanji_kouzous[1][2] + ":TopInside"
        elif kanji_kouzous[1][0] == "⿷":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":LeftOutside    " + kanji_kouzous[1][2] + ":RightInside"
        elif kanji_kouzous[1][0] == "⿸":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":TopLeftOutside    " + kanji_kouzous[1][2] + ":BottomRightInside"
        elif kanji_kouzous[1][0] == "⿹":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":TopRightOutside    " + kanji_kouzous[1][2] + ":BottomLeftInside"
        elif kanji_kouzous[1][0] == "⿺":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":BottomLeftOutside    " + kanji_kouzous[1][2] + ":TopRightInside"
    elif len(kanji_kouzous[1]) == 4:
        if kanji_kouzous[1][0] == "⿲":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":VerticalLeft    " + kanji_kouzous[1][2] + ":VerticalCenter    " + kanji_kouzous[1][3] + ":VerticalRight"
        elif kanji_kouzous[1][0] == "⿳":
            kanji_kouzous[1] = kanji_kouzous[1][1] + ":ParallelTop    " + kanji_kouzous[1][2] + ":ParallelCenter    " + kanji_kouzous[1][3] + ":ParallelBottom"
    elif kanji_kouzous[1][0] == "⿰" and kanji_kouzous[1][1] == "⿰" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":VerticalLeft    " + kanji_kouzous[1][3] + ":VerticalCenter    " + kanji_kouzous[1][4] + ":VerticalRight"    
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][1] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":ParallelTop    " + kanji_kouzous[1][3] + ":ParallelCenter    " + kanji_kouzous[1][4] + ":ParallelBottom"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][2] == "⿰" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Top    " + kanji_kouzous[1][3] + ":Left    " + kanji_kouzous[1][4] + ":Right"
    elif kanji_kouzous[1][0] == "⿰" and kanji_kouzous[1][2] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Left    " + kanji_kouzous[1][3] + ":Top    " + kanji_kouzous[1][4] + ":Bottom"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][1] == "⿰" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":Left    " + kanji_kouzous[1][3] + ":Right    " + kanji_kouzous[1][4] + ":Bottom"
    elif kanji_kouzous[1][0] == "⿰" and kanji_kouzous[1][1] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":Top    " + kanji_kouzous[1][3] + "Bottom:    " + kanji_kouzous[1][4] + ":Right"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][1] == "⿳" and len(kanji_kouzous[1]) == 6:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":Top    " + kanji_kouzous[1][3] + "ParallelTop:    " + kanji_kouzous[1][4] + ":ParallelCenter" + kanji_kouzous[1][5] + ":ParallelBottom"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][2] == "⿻" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Top    " + kanji_kouzous[1][3] + "Center:    " + kanji_kouzous[1][4] + ":Center"
    elif kanji_kouzous[1][0] == "⿸" and kanji_kouzous[1][1] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":TopLeftOutside    " + kanji_kouzous[1][3] + "Top:    " + kanji_kouzous[1][4] + ":Bottom"
    elif kanji_kouzous[1][0] == "⿸" and kanji_kouzous[1][2] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":TopLeftOutside    " + kanji_kouzous[1][3] + "Top:    " + kanji_kouzous[1][4] + ":Bottom"
    elif kanji_kouzous[1][0] == "⿺" and kanji_kouzous[1][2] == "⿱" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":BottomLeftOutside    " + kanji_kouzous[1][3] + "Top:    " + kanji_kouzous[1][4] + ":Bottom"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][2] == "⿺" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Top    " + kanji_kouzous[1][3] + "BottomLeftOutside:    " + kanji_kouzous[1][4] + ":TopRightInside"
    elif kanji_kouzous[1][0] == "⿰" and kanji_kouzous[1][1] == "⿻" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][2] + ":Left    " + kanji_kouzous[1][3] + "Center:    " + kanji_kouzous[1][4] + ":Center"
    elif kanji_kouzous[1][0] == "⿱" and kanji_kouzous[1][2] == "⿵" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Top    " + kanji_kouzous[1][3] + "TopOutside:    " + kanji_kouzous[1][4] + ":BottomInside"
    elif kanji_kouzous[1][0] == "⿰" and kanji_kouzous[1][2] == "⿹" and len(kanji_kouzous[1]) == 5:
        kanji_kouzous[1] = kanji_kouzous[1][1] + ":Left    " + kanji_kouzous[1][3] + "TopRightOutside:    " + kanji_kouzous[1][4] + ":BottomLeftInside"
    else:
        print(kanji_kouzous)

    kanji_kouzous = '	 '.join(kanji_kouzous)  # リストを文字列("使,⿰亻吏")に戻す
    kanji_kouzou_id_list.append(kanji_kouzous)  # 常用漢字の構造一覧のリストに追加

kanji_kouzou_id_str = "\n".join(kanji_kouzou_id_list)

kanji_kouzou_id_file.write(kanji_kouzou_id_str)  # 常用漢字の構造一覧の文字列をテキストファイルに書き出す
# ファイルクローズ
kanji_kouzou_kigou_file.close()
kanji_kouzou_id_file.close()

print("書き出し完了")