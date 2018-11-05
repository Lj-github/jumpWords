# -*- coding: utf-8 -*-
# @Time    : 2018/11/5 下午8:38
# MoviePy依赖于python的模块：numpy，imageio，Decorator和tqdm，

#brew install ffmpeg  安装 ffmpeg  基于 ruby

import imageio.plugins.ffmpeg
imageio.plugins.ffmpeg.download()
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy.audio.AudioClip import CompositeAudioClip

videoclip = VideoFileClip("file.avi")
audioclip = AudioFileClip("test.mp3")

new_audioclip = CompositeAudioClip([videoclip.audio, audioclip])
videoclip.audio = new_audioclip
videoclip.write_videofile("new_filename.mp4")
