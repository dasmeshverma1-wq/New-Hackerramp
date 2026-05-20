import os

with open("index (1).html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Hide the top grid on mobile
old_top_grid = """        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#e4e4e7]">
            <div className="p-5 border-r border-b lg:border-b-0 border-[#e4e4e7]">"""
new_top_grid = """        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 border-t border-[#e4e4e7]">
            <div className="p-5 border-r border-b lg:border-b-0 border-[#e4e4e7]">"""
code = code.replace(old_top_grid, new_top_grid)

# 2. Make FunZoneStat grid 2 columns on mobile
old_bottom_grid = """      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <FunZoneStat label="Today's vibe" value="High" caption="Prototype energy" tone="pink" />"""
new_bottom_grid = """      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <FunZoneStat label="Today's vibe" value="High" caption="Prototype energy" tone="pink" />"""
code = code.replace(old_bottom_grid, new_bottom_grid)

with open("index (1).html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated fun zone mobile UI!")
