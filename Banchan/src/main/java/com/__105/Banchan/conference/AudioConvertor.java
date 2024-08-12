package com.__105.Banchan.conference;

import ws.schild.jave.Encoder;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

// webm to wav code
public class AudioConvertor {

    private static final String RECORDINGS_PATH = "/opt/openvidu/recordings/";

    public Optional<File> convertFile(String sessionId) {

        try {
            Path path = Files.walk(Paths.get(RECORDINGS_PATH + sessionId))
                    .filter(Files::isRegularFile)
                    .filter(p -> p.toString().endsWith(".webm"))
                    .findFirst()
                    .orElse(null);

            if (path != null) {
                File source = path.toFile();
                String targetPath = path.toString().replace(".webm", ".wav");
                File target = new File(targetPath);

                if (convertToWav(source, target)) {
                    return Optional.of(target);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    /*
     * STT API를 활용하기 위해 webm 미디어 파일을 wav 음성파일로 변환합니다.
     * STT의 경우 Sampling rate 16k channel 1인 경우가 가장 권장되므로 설정
     * */
    private boolean convertToWav(File source, File target) {

        AudioAttributes audio = new AudioAttributes();
        audio.setCodec("pcm_s16le"); // WAV 포맷 코덱
        audio.setChannels(1); // 모노 채널
        audio.setSamplingRate(16000); // 16 kHz 샘플 레이트

        EncodingAttributes attrs = new EncodingAttributes();
        attrs.setOutputFormat("wav");
        attrs.setAudioAttributes(audio);

        Encoder encoder = new Encoder();
        try {
            encoder.encode(new MultimediaObject(source), target, attrs);
            System.out.println("Converted: " + source.getName() + " to " + target.getName());
            return true;
        } catch (Exception e) {
            System.err.println("Error converting " + source.getName());
            e.printStackTrace();
            return false;
        }
    }
}