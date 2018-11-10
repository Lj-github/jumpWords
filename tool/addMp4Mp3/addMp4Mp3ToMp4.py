# -*- coding: utf-8 -*-
# @Time    : 2018/11/5 下午8:38
# MoviePy依赖于python的模块：numpy，imageio，Decorator和tqdm，

#brew install ffmpeg  安装 ffmpeg  基于 ruby

# import imageio.plugins.ffmpeg
# imageio.plugins.ffmpeg.download()
# from moviepy.video.io.VideoFileClip import VideoFileClip
# from moviepy.audio.io.AudioFileClip import AudioFileClip
# from moviepy.audio.AudioClip import CompositeAudioClip
import os
# videoclip = VideoFileClip("file.avi")
# audioclip = AudioFileClip("test.mp3")
#
# new_audioclip = CompositeAudioClip([videoclip.audio, audioclip])
# videoclip.audio = new_audioclip
# videoclip.write_videofile("new_filename.mp4")


# 使用命令  ffmpeg
#os.system('ffmpeg -i file.avi -i test.mp3 -c copy output.avi')


#os.system('ffmpeg -i file.avi -i test.mp3 - vcodec copy - acodec copy output.avi')
os.system("ffmpeg -i file.avi -i test.wav -c:v copy -c:a aac -strict experimental output1.avi")

os.system('ffmpeg -i test.wav  -i file.avi out1.avi ')
os.system('ffmpeg -i file.avi -i test.mp3 -vcodec copy -acodec copy output2.avi')

#mp3 转 wav
#ffmpeg -i test.mp3 -acodec pcm_u8 -ar 22050 test.wav
#
# ffmpeg -i file.avi -vcodec copy -an file2.avi
# ffmpeg -i file2.avi -i test.mp3 -vcodec copy -acodec copy output3.avi

#
# ffmpeg -i load.mp4 -vcodec copy -an load2.mp4
# ffmpeg -i load2.mp4 -i test.mp3 -vcodec copy -acodec copy load3.mp4


#ffmpeg -i file.avi -vcodec copy -an file2.avi
#

# 合并
# ffmpeg -i spl.avi -i test.mp3 -vcodec mpeg4 -acodec copy add.mp4

# 先转 aac  在合并
#ffmpeg -i file.avi -i test.mp3 -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 file_out.avi

'''
# 需要 aac 格式的音频文件  ffmpeg -i test.mp3 -acodec aac -strict experimental -ab 128k -ar 16k -ac 2 -y test.aac
# 需要提前 抽取 mp4 文件 # 提取： # # ffmpeg -i load.mp4 -vcodec copy -an spl.avi
# 需要 最后生成mp4 文件 ffmpeg -i spl.avi -i test.aac -vcodec mpeg4 -acodec copy add.mp4

'''

#
# ffmpeg -i spl.avi -i test.aac -vcodec mpeg4 -acodec copy add.mp4
#
# ffmpeg -i file.avi -i test.aac -vcodec mpeg4 -acodec copy add.mp4  !可以


#ffmpeg -i file.avi -i test.aac -vcodec mpeg4 -acodec copy wodecunwenbudaowoaideren.mp4  成功



