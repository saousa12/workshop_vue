<template>
  <div class="ma-5">
    <div>
      <v-row>
        <v-col cols="12" sm="6" md="6" style="padding: 5%">
          <p
            style="
              font-weight: 400;
              font-size: 5rem;
              color: #2196f3;
              animation-timing-function: linear;
            "
            class="animation text-md-h2 text-h3"
          >
            Hello! I am USA.
          </p>
          <p
            class="pa-5 text-md-h5 text-subtitle-1"
            style="text-indent: 100px; text-align: justify"
          >
            สวัสดีค่ะ ฉันชื่อ อุษา จุ้ยแหวว มีความหมายว่า เช้าตรู่ รุ่งเช้า และ
            แสงเงิน แสงทอง เป็นคนจังหวัดแม่ฮ่องสอน ลักษณะนิสัย คือ เป็นมิตร
            และขี้อาย มีจุดแข็ง คือ จริงใจ, ปรับตัวได้ดี และจุดอ่อน คือ ขี้ลืม
            ไม่ค่อยกล้าแสดงออก
            เป้าหมายในอนาคตฉันมุ่งมั่นที่จะพัฒนาตนเองในด้านการสื่อสารเพื่อเพิ่มความมั่นใจในการแสดงออก
          </p>
          <!-- ฉันมุ่งมั่นที่จะพัฒนาทักษะทางด้านคอมพิวเตอร์    และอยากมีโอกาสทำงานในสาขาที่เกี่ยวกับคอมพิวเตอร์ที่ฉันได้เรียนมา-->
          <div class="my-5 pa-4 blue lighten-4 rounded-xl">
            <imgCard v-for="(item, index) in items" :key="index" :item="item" />
          </div>
        </v-col>
        <v-col cols="6" style="padding: 5%">
          <div>
            <v-img
              style="border-radius: 20px; display: block; object-fit: cover"
              src="../assets/me.png"
              max-width="600"
              height="700"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="ma-5">
      <div class="d-md-flex flex-row">
        <h1>Favorite Movies:</h1>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple--text text--accent-4"
          mandatory
          class="pl-2"
        >
          <v-chip>Cartoon</v-chip>
          <v-chip>Action</v-chip>
          <v-chip>Comedy</v-chip>
          <v-chip>Adventure</v-chip>
        </v-chip-group>
      </div>
      <v-row class="pa-5">
        <v-col
          v-for="(m, index) in movies"
          :key="index"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="pa-2">
            <v-img :src="m.img" height="400" contain />
            <v-card-title>{{ m.title }}</v-card-title>
            <v-card-subtitle>{{ m.score }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <h1>Favorite Youtube Channel:</h1>
      <v-row class="pa-5">
        <v-col
          v-for="(y, index) in channels"
          :key="index"
          cols="12"
          sm="6"
          md="3"
        >
          <v-hover v-slot="{ hover }">
            <v-card class="pa-2" height="320">
              <v-slide-y-reverse-transition>
                <v-img :src="y.img" contain height="300">
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal text-h4 white--text"
                    style="height: 25%"
                  >
                    {{ y.title }}
                  </div>
                </v-img>
              </v-slide-y-reverse-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import imgCard from "../components/imgCard.vue";
export default {
  name: "Me",
  components: {
    imgCard,
  },
  data() {
    return {
      items: [
        {
          title: "Education",
          content: "👩‍🎓 มหาวิทยาลัยแม่โจ้ สาขาวิทยาการคอมพิวเตอร์",
        },
        {
          title: "Favorite",
          content: "ราดหน้าหมี่กรอบ, สีฟ้า",
        },
        { title: "Hobby", content: "ดูหนัง, ทำความสะอาด" },
      ],
      movies: [
        {
          title: "Frozen",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzq63O3eOrwb-uHEGXErWH0wSOxbsFWSSteQ&s",
          score: "⭐⭐⭐⭐",
        },

        {
          title: "Brave citizen",
          img: "https://m.media-amazon.com/images/M/MV5BYjRmMjE0NjgtNWMzNi00NTkyLWEzNDgtMzE4Y2NiOGVmNGJlXkEyXkFqcGdeQXVyODU2NTg4OTc@._V1_FMjpg_UX1000_.jpg",
          score: "⭐⭐⭐⭐",
        },
        {
          title: "Marvel: endgame",
          img: "https://fbi.dek-d.com/27/0711/9712/129929095",
          score: "⭐⭐⭐",
        },
        {
          title: "Battleship",
          img: "https://play-lh.googleusercontent.com/8OH5JY_dLsU1zuxdvj3V1IrOgUw2E8kO05yLsljR9RtglDDZ33MZZiaBCA78SXjx_ILD",
          score: "⭐⭐⭐⭐⭐",
        },
      ],
      channels: [
        {
          title: "Cullen hateberry",
          img: "https://i.ytimg.com/vi/Tyhg5GoVspY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBWLPaw0x-k7BPcoE3T3Fg7IUKPxg",
        },
        {
          title: "Kaykai salaider",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehxJvn1ngyfJM95DDheAgiduEnzmDwD1QYA&s",
        },
        {
          title: "Pigkaploy",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHf-KFurvGeBU10v6G4detcXdX--VJ5t5pXQ&s",
        },
      ],
    };
  },
};
</script>
<!-- {
            title: "Kongruksiam",
            img: "https://yt3.googleusercontent.com/2eVBbUulBZpKRScD4FPQLIWoDn80C3xirBy9v7ce4rL6qHE3msq-tss64ZTc7ugrsmRRdNa9=s900-c-k-c0x00ffffff-no-rj",
          }, -->

<style>
.animation {
  overflow: hidden;
  font-size: 3.6rem;
  font-weight: 700;
  border-right: 0.15rem solid orange;
  white-space: nowrap;
  /* display: inline-block; */
  /* animation: typing 4s steps(40, end); */
  animation: typing 4s steps(40, end), blink-caret 0.75s step-end infinite;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
