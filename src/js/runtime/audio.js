import bgmMp3 from '../../resources/audio/bgm.mp3';
import bulletMp3 from '../../resources/audio/bullet.mp3';
import boomMp3 from '../../resources/audio/boom.mp3';

const playBgm = () => {
    const bgmAudio = new Audio();
    bgmAudio.src = bgmMp3;
    bgmAudio.loop = true;
    bgmAudio.play().catch(error => console.error("playBgm error: ", error))
}

const playShoot = () => {
    const shootAudio = new Audio();
    shootAudio.src = bulletMp3;
    shootAudio.play().catch(error => console.error("playShoot error: ", error))
}

const playBoom = () => {
    const boomAudio = new Audio();
    boomAudio.src = boomMp3;
    boomAudio.play().catch(error => console.error("playBoom error: ", error))
}

export { playBgm, playShoot, playBoom }