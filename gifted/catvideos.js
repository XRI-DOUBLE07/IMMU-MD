const { gmd } = require("../gift");
const { sendButtons } = require("gifted-btns");
const axios = require("axios");

function extractButtonId(msg) {
    if (!msg) return null;
    if (msg.templateButtonReplyMessage?.selectedId)
        return msg.templateButtonReplyMessage.selectedId;
    if (msg.buttonsResponseMessage?.selectedButtonId)
        return msg.buttonsResponseMessage.selectedButtonId;
    if (msg.listResponseMessage?.singleSelectReply?.selectedRowId)
        return msg.listResponseMessage.singleSelectReply.selectedRowId;
    if (msg.interactiveResponseMessage) {
        const nf = msg.interactiveResponseMessage.nativeFlowResponseMessage;
        if (nf?.paramsJson) {
            try { const p = JSON.parse(nf.paramsJson); if (p.id) return p.id; } catch {}
        }
        return msg.interactiveResponseMessage.buttonId || null;
    }
    return null;
}

const CAT_VIDEO_LINKS = [
  "https://drive.google.com/uc?export=download&id=1b09O8uGqGrXdGagVj6gXYBb4l3ZsU-mZ",
  "https://drive.google.com/uc?export=download&id=1yk5BWUGTm8LBuseHhLGoggr0sxbkka5e",
  "https://drive.google.com/uc?export=download&id=1VUFUE-zT-REdGZQeoS6AV-aaiSsx6oH8",
  "https://drive.google.com/uc?export=download&id=1UB8L6N_hTQ6_MEZy56HFYtgsVe6_MJKl",
  "https://drive.google.com/uc?export=download&id=1XBz4nexy4X3AdksRw-2J4QimY59c6nnf",
  "https://drive.google.com/uc?export=download&id=1WEOTjKRZvScS4UVcY6o0wOkJrOUnA3pi",
  "https://drive.google.com/uc?export=download&id=1qySQ4UlGZBO1_pjy5sxP6vVZR6pTEEbc",
  "https://drive.google.com/uc?export=download&id=1ba-1Kx3FKqj9DTZiqsCvEMtztCavqxDv",
  "https://drive.google.com/uc?export=download&id=1_RXfXT220_yzH1SiBCyZiSy2bfYO73BL",
  "https://drive.google.com/uc?export=download&id=1-7iW9X2ndtLlHX6stERDgFXLbLZuCNJI",
  "https://drive.google.com/uc?export=download&id=1VhIuzS1igiqRkDFpnHUXanvdbylj_aym",
  "https://drive.google.com/uc?export=download&id=165k1BI9LJMP8tFm8h_5CDgjNjqTW0nfI",
  "https://drive.google.com/uc?export=download&id=1LZoWhassCAJ_C3PtBK8DTgWjdu0OLAmk",
  "https://drive.google.com/uc?export=download&id=1nPofoj9lrL5OwmndZiADzMrLVztQUz7u",
  "https://drive.google.com/uc?export=download&id=13jqwXYSq_SFtsbvdW1SVjOmEEtVLA9Ul",
  "https://drive.google.com/uc?export=download&id=1YV1L4zJ8CQKgQCqqds6uyTzdePvEtgyf",
  "https://drive.google.com/uc?export=download&id=1E3wUiVmtt0rtvzCAWhu3zNrf9oxZFuLa",
  "https://drive.google.com/uc?export=download&id=123Mi0PXD63MSWNGY7kVzLgena5IdREX-",
  "https://drive.google.com/uc?export=download&id=1tAyfMJ3qMVaB3fM7zhf3-r1Jwxm6q92r",
  "https://drive.google.com/uc?export=download&id=1gCWIVlnms4wYbxAZEpdwGxHET7wLPg1x",
  "https://drive.google.com/uc?export=download&id=1X75PLJXiJ_PMAWPwXc8lWN8ns_y9fPLK",
  "https://drive.google.com/uc?export=download&id=1zb7pjvCcL8qVnHKtoRz_i2pEJYHQGFB8",
  "https://drive.google.com/uc?export=download&id=1Lye_7pMJxOootNzJ7MJSklbye4Eoi1CB",
  "https://drive.google.com/uc?export=download&id=1lTSAriCgtMO6BizHDhl7jJer5yrerJ7K",
  "https://drive.google.com/uc?export=download&id=1hSVxswI1sd1hOJqfr8yu0Grani28I1hw",
  "https://drive.google.com/uc?export=download&id=1fkVKjfXufWotjSa2BtzbscDaZpu7hZYQ",
  "https://drive.google.com/uc?export=download&id=19xnRQJer8eSpOp8rdXTGzZMazJsUfSr_",
  "https://drive.google.com/uc?export=download&id=1Zmzxf0oYv2rSo3a2yIv1SRsKf8WwRJo4",
  "https://drive.google.com/uc?export=download&id=1y4szem2c8dazWNnQlf4w-v9B2XsI-wcE",
  "https://drive.google.com/uc?export=download&id=1k4eNQGO1Ot_rWpHX24oa11NEvlv54BLV",
  "https://drive.google.com/uc?export=download&id=1bd9N9caYlU60d3Cbu2y_QsGiUfLoh4Y1",
  "https://drive.google.com/uc?export=download&id=12vZWoCRzbuNSB4RauVUDHVNC89NI4Y2n",
  "https://drive.google.com/uc?export=download&id=16LcgNuHXZWXgDLMZw9EN-57paLVBmq3U",
  "https://drive.google.com/uc?export=download&id=1_WZvoOM70jMdfSm2ZAz7C0vyFHZAQo7C",
  "https://drive.google.com/uc?export=download&id=1L51VgDAIuDMyZ84TA5llVnAX-ScnGP1D",
  "https://drive.google.com/uc?export=download&id=1Oti4KTvcnM6xGqWjzMb8SiHfZ6boG93V",
  "https://drive.google.com/uc?export=download&id=14lZEilXJHyyfcjFahvHD7noJ1XIIiS0C",
  "https://drive.google.com/uc?export=download&id=1O0LLYN3FhAmNrv9w0i2W5IA7-bWgj68n",
  "https://drive.google.com/uc?export=download&id=1QAR_rNIPy2fpw8CLiVB-mKYCk5GY_H6H",
  "https://drive.google.com/uc?export=download&id=1SUlFrS-CGoowAspOzF9PBDWeqiUVNLVE",
  "https://drive.google.com/uc?export=download&id=18KMX77RQYFDArxH3OELoRwxqwZZvcR8D",
  "https://drive.google.com/uc?export=download&id=1_Spl9O_3hNGFhiluML7Lqz7w2YfC8-Up",
  "https://drive.google.com/uc?export=download&id=1NYQmGAqOQ4t-OdoK-7hdo5J19dPz8bJO",
  "https://drive.google.com/uc?export=download&id=1JZuK_ewQ0C8mXt7LoXDJ5PleNGqU7qrC",
  "https://drive.google.com/uc?export=download&id=1DE0jwXmnA_60X-PMOouBQ3uuqPxaB23C",
  "https://drive.google.com/uc?export=download&id=1rbvaO0p-s120Rqf-jznuiKgfmMEsEKUO",
  "https://drive.google.com/uc?export=download&id=1b5SGrqvRdYPrRLPvJVDfupFeaU2Nl9Gh",
  "https://drive.google.com/uc?export=download&id=1k9aCSRnvdnQwXc_hPe8H7W2gTjfVuqL-",
  "https://drive.google.com/uc?export=download&id=1swqGydWPqIlkjT6ivX1P3UvskD5F0W1j",
  "https://drive.google.com/uc?export=download&id=1KTY4qcqeAyCDrZr-hQC4q31XYpldOSDY",
  "https://drive.google.com/uc?export=download&id=1uU9WJXP8UuSwrOyfZKjBaIXfDmN0ld8t",
  "https://drive.google.com/uc?export=download&id=1tO0HJVKMakhVvtaA1yM-NzmOm3bLVFs7",
  "https://drive.google.com/uc?export=download&id=10blttm5A2a4k898lO3sNpbH9SXDY7efp",
  "https://drive.google.com/uc?export=download&id=1vuqW9VhMju9u5m-Hd1t_IKbXCjb3y_Ea",
  "https://drive.google.com/uc?export=download&id=1K16A382uHmRBsAf1NLQviBAuo2gGo0z0",
  "https://drive.google.com/uc?export=download&id=1rD-C1KqrwxLiYfRkNxJL2fKp8L2BtTdH",
  "https://drive.google.com/uc?export=download&id=1fiiH2Y2aFOZ3MqMUjp2kZFySCAi3sVcB",
  "https://drive.google.com/uc?export=download&id=1hwLzyIzSx_Bq2jVlv7pFlRIdrvaR9hsb",
  "https://drive.google.com/uc?export=download&id=1zysAWbG-J1H7zrvuLTXPNi0UjHoh7PYD",
  "https://drive.google.com/uc?export=download&id=1ZrkY0RkPnR44xxShiQPeKyDYEY83R6vw",
  "https://drive.google.com/uc?export=download&id=1h0xxrT2jgGYxgGQdJndvb79whJ2nbC_P",
  "https://drive.google.com/uc?export=download&id=1izJgjghGZKRrvqdjgeN8CMvA_sPwTade",
  "https://drive.google.com/uc?export=download&id=1981dyhMYDZax-mQoxn4TR_zOyxpmhLW6",
  "https://drive.google.com/uc?export=download&id=1BDUqmWIYjJ7YDUQbMRI8tKZoiK4z4wDi",
  "https://drive.google.com/uc?export=download&id=1W1Bmvv3J7jQfi9ony6wor7JOvxz6fwEu",
  "https://drive.google.com/uc?export=download&id=1OS88EAa-rukILF6_9Kqf6akRZJu5BIsG",
  "https://drive.google.com/uc?export=download&id=1QJPbAyf7VGXXeWf3LjTlvoPDtjlQ3zr_",
  "https://drive.google.com/uc?export=download&id=1MfzYXhoQbUOZOXJH1f0Nmrf7PVVwOWrF",
  "https://drive.google.com/uc?export=download&id=1dToz-280CYTCOW0IvXCze6eTokkv7hSn",
  "https://drive.google.com/uc?export=download&id=1DQ9jStPHKO7oZ-8bCHeaAiD5hacMWxxy",
  "https://drive.google.com/uc?export=download&id=1-OnDFDK8qiaxAZa0qO93tV-0k2o9664Z",
  "https://drive.google.com/uc?export=download&id=1fHk4xedEUX4w319yqXrqFYBCwx0FczaV",
  "https://drive.google.com/uc?export=download&id=11JgnSofsXt5a58y_Xu8KJAzUyT-ItDK3",
  "https://drive.google.com/uc?export=download&id=1CtuFArZDNz0hhGrwBleXVgSTSZimpwXF",
  "https://drive.google.com/uc?export=download&id=176dOgOs17wghraRpxsfnupk1ZqF0q-_T",
  "https://drive.google.com/uc?export=download&id=16yJDtw0EbZTXdXr4WmC46eCc-Uweamez",
  "https://drive.google.com/uc?export=download&id=1xtqcT7vZeupKJPi8scUhY0jT5flncwQh",
  "https://drive.google.com/uc?export=download&id=1rKZ-LmdVKz8kz-xAMVIuCpzvHJm5OPvB",
  "https://drive.google.com/uc?export=download&id=1134jsdoh28RoPK6tEk2wdoDN5yK9Nspb",
  "https://drive.google.com/uc?export=download&id=1FztzGhHG0lrO4GlQN06NUJH6O4FlA320",
  "https://drive.google.com/uc?export=download&id=16FQmsRsg-WxUY27CXB2osMrkuyYYW2XT",
  "https://drive.google.com/uc?export=download&id=13XnscagU5blAdloN5MQPy3Ixh5UHjyyh",
  "https://drive.google.com/uc?export=download&id=1f4sEUokeS6yZUonhrHzlsMLLEMhkscrg",
  "https://drive.google.com/uc?export=download&id=17Dk4lASRGBXHoInAGYubDnD9udEMUTPD",
  "https://drive.google.com/uc?export=download&id=1ECO9gVpAIOp5pOmr_-lPApfMWDJrNkSo",
  "https://drive.google.com/uc?export=download&id=1oXpXYGlDAKX5GNXaE3C2qCpr_XDa-YJt",
  "https://drive.google.com/uc?export=download&id=1jhdQNR9Yo7O9LOFyrz5H9l2NxZZQLLbi",
  "https://drive.google.com/uc?export=download&id=1kGH9O2o2sc-R_O6gtuI-kf9g5FS6ls1l",
  "https://drive.google.com/uc?export=download&id=1yjJPNQ4fb339-_oCmRZ8j2vFZkbuBHVC",
  "https://drive.google.com/uc?export=download&id=1yp64YYPc54t12tHeFMUhDyRpQLiN4e6Q",
  "https://drive.google.com/uc?export=download&id=1WP0kmUT7Eca2Pj38d72Ssrzx1PY5BvE9",
  "https://drive.google.com/uc?export=download&id=131E7mUjKLvvjCgFbJ5aHSagcmLPkGz8W",
  "https://drive.google.com/uc?export=download&id=13Lc1BeUek1FRQhaF-rdkE-MVVuDObgv2",
  "https://drive.google.com/uc?export=download&id=1oxe7NYss2xd00sdiIyQXdDZgR0n1BM3b",
  "https://drive.google.com/uc?export=download&id=1MY16BMdgO9HLfNbYye5dWlyEemE8hZOE",
  "https://drive.google.com/uc?export=download&id=1rjD7PT5TtiQ7gQnYJOCUou8a2cEyQpL6",
  "https://drive.google.com/uc?export=download&id=1X7vzPwPs77_QY93V24fbSyMykjqxqrPd",
  "https://drive.google.com/uc?export=download&id=1bhG1Ge4IbDlXCb3zyb2eMjd3mNiMTRn5",
  "https://drive.google.com/uc?export=download&id=1DnecABLxMutZxmQkrTDKMlO0ESzR6ZlY",
  "https://drive.google.com/uc?export=download&id=1m-o9pSZpzpHNmFF9IsQn4-B5gxX7A5OD",
  "https://drive.google.com/uc?export=download&id=1OfdxF_ylolfusu3_UIowGgX7RvPBxYez",
  "https://drive.google.com/uc?export=download&id=1rM4lJahHdTexCzJS2VXfkbUgAXKwcofz",
  "https://drive.google.com/uc?export=download&id=18il56j2mQGXOyT-xKMvMIshA5TAp5xvB",
  "https://drive.google.com/uc?export=download&id=1FyH2r9ARtZdCuTSPaOL9dSHEJM1E8dvJ",
  "https://drive.google.com/uc?export=download&id=12Ki3yKoDRheFCtCL7hFlibgBNLweuHDV",
  "https://drive.google.com/uc?export=download&id=1b9gQfZc_68AuNtx152DymUdBUSPqTFlZ",
  "https://drive.google.com/uc?export=download&id=1jIDbPwZWUxHHBk_gRcAQ1sy6OES14dgb",
  "https://drive.google.com/uc?export=download&id=1lxHCELS3yuZoz_rd3wI-9B-fpQhwpjKg",
  "https://drive.google.com/uc?export=download&id=14ELGVwPxXBtp5YGbNECTDH2tqyCcU1kq",
  "https://drive.google.com/uc?export=download&id=1StfS7m1pVu_aAvcA63LAzUGDIayNAsiN",
  "https://drive.google.com/uc?export=download&id=1WxXIJBGX98GTVy9y-A_3Pqe0VCsoMoWM",
  "https://drive.google.com/uc?export=download&id=1bUD47O_nk8J0BrCLMBz_6PU9IxMWEDaR",
  "https://drive.google.com/uc?export=download&id=1Z1voIS0aFubGwI2M9omqgDgVrmjdf7bi",
  "https://drive.google.com/uc?export=download&id=1zPhb0v7_fSZQtaqkaTIi-IBivRX-wqAj",
  "https://drive.google.com/uc?export=download&id=1DueevOQh9V9DTayyH8wn8tjJnzH-pHVS",
  "https://drive.google.com/uc?export=download&id=1MYnkNmAgmwML444WmKO_baEBeZ26Vg3B",
  "https://drive.google.com/uc?export=download&id=107qYIgYkI2ABjBxFCnPK4EpRo8TVvSwE",
  "https://drive.google.com/uc?export=download&id=1o__m7CCZz1ou0NxH5_h9xFMKBBtk8mNt",
  "https://drive.google.com/uc?export=download&id=1qqChaHYKb2sX-bvn6T5yCtU1dc9tt6B8",
  "https://drive.google.com/uc?export=download&id=1rJlxMYtwjEe7qgEd4Igx_DUHU1_79tQa",
  "https://drive.google.com/uc?export=download&id=11MMfRiS1mSvVBX0MyGrHuP7MsV8eYmG1",
  "https://drive.google.com/uc?export=download&id=1rTL5HnfSHk3NEiLBocFCklV-kSMFkxjf",
  "https://drive.google.com/uc?export=download&id=1jv9A-SBB1AJt9L2iJjFFO6KehJYAHTIM",
  "https://drive.google.com/uc?export=download&id=1niEloTeBwFAW4T4IJt-CTBgbjPal8HS6",
  "https://drive.google.com/uc?export=download&id=1VRgRh6dHv7finPLxKUjoXie_3UH1mEYc",
  "https://drive.google.com/uc?export=download&id=1sZqBxYfIPvbbDwWRetrEnMUlIIeXrdJ2",
  "https://drive.google.com/uc?export=download&id=1jg8r0BYYOcQAgR_N2ihubGgmPHDp2Fei",
  "https://drive.google.com/uc?export=download&id=1nnb3z4BBnyWoTDZw1053LXdzJBaZ_AX5",
  "https://drive.google.com/uc?export=download&id=1yOEwCQaYWV9nYNhuMFzUIpxhvn-z2lS6",
  "https://drive.google.com/uc?export=download&id=1Z65y-cKei-dWALEYEW2wvmv0F_8udAaW",
  "https://drive.google.com/uc?export=download&id=1MXkQWE7Nayt_j7hyCAX5BIZwycQ--Kuf",
  "https://drive.google.com/uc?export=download&id=1eE7GADuXwXkILlpkUD5q-u-IL35C7Cey",
  "https://drive.google.com/uc?export=download&id=1Nj4kMSKdmk2OTxJjot0U1oWv5CgrG76z",
  "https://drive.google.com/uc?export=download&id=1eRubtgqUzUG9p2O-1us_dUb7JwNKUiN5",
  "https://drive.google.com/uc?export=download&id=1_pk2KTBlwgdrtp9URG7ZD7A-KnczBOaR",
  "https://drive.google.com/uc?export=download&id=1S214erb9SPdoOwflbeWpWuAzk9R-eyLz",
  "https://drive.google.com/uc?export=download&id=1gubkD8JzwxIVDi2_hLBk-Ds71CgKVxQh",
  "https://drive.google.com/uc?export=download&id=1MP830g8-QHcBJaZuA5ynTKvkw8NpsOPd",
  "https://drive.google.com/uc?export=download&id=1VAOT_Rkmjl3MVWSDCRWNwZZT6WZVnhfT",
  "https://drive.google.com/uc?export=download&id=1t8SgiLrs0XTW6oXn1IXjphUCcFBMR8lv",
  "https://drive.google.com/uc?export=download&id=1cCo98QvdKjnqXx0YODaeszGkVB0SRZKV",
  "https://drive.google.com/uc?export=download&id=1Bryzn4naFGXYuwTfTDbG4r3hFnKrJzIv",
  "https://drive.google.com/uc?export=download&id=14-xZV88mxeNnWJdZsnsb4KePeleYsgrN",
  "https://drive.google.com/uc?export=download&id=1Wt4zxUsroGe8OyckzhfY0veGuUnoO9ON",
  "https://drive.google.com/uc?export=download&id=1C2aKB4Uwt-9gaqCPukJLQzW5YM8zWwJG",
  "https://drive.google.com/uc?export=download&id=1izwLZhGtq7JtxHfm3hhX5HXJ0YhlYVTV",
  "https://drive.google.com/uc?export=download&id=1azhXnyKQu-vnsl83J554Mo96mTJ5pnro",
  "https://drive.google.com/uc?export=download&id=1hdBuzzrjelqF66PjabxN9LQDIafJoWYt",
  "https://drive.google.com/uc?export=download&id=1rcJHktpSpy73vus3ygngD1NeaZzkzNEw",
  "https://drive.google.com/uc?export=download&id=1OQDUNZxvE5DQBUj_3erwq-jKz5U4BQfX",
  "https://drive.google.com/uc?export=download&id=1dZNyEo-VfOYLrJL-8r4VfxDJeEOKJ-g4",
  "https://drive.google.com/uc?export=download&id=1E-XgRG-o62o9QsEPFCJi37dKlAr4FgDA",
  "https://drive.google.com/uc?export=download&id=1akrDg6aUapVAiRg49efrlUPXktO81MYZ",
  "https://drive.google.com/uc?export=download&id=178CPc1DmbUFeoCTmd20yqemjvS7uF8AA",
  "https://drive.google.com/uc?export=download&id=1YbvUTZiCCJkvSqe2E8EJsWEw2Ok7c2e4",
  "https://drive.google.com/uc?export=download&id=1p8c9yjy_ailPxfQfxI1wm2cpYj6NrDNN",
  "https://drive.google.com/uc?export=download&id=171LgxHtMB6t7-A8L7tTihNKdtOE6mgm_",
  "https://drive.google.com/uc?export=download&id=1gq81IM0fcH5sRwY6D-3DajKAQj2aLVPF",
  "https://drive.google.com/uc?export=download&id=1ihgRkxfrM3VPzjSOdG1qY36OBvkMNmMA",
  "https://drive.google.com/uc?export=download&id=1ucSE3HL-EkeARRwHKMWN1JnzwoRHcooH",
  "https://drive.google.com/uc?export=download&id=1jFkneovmgrpG5yGOSPFlKJ_mFCJ3L93T",
  "https://drive.google.com/uc?export=download&id=10vwcQV6splGAvINeVXyjAjM6ge0LxZ80",
  "https://drive.google.com/uc?export=download&id=1nX-rfO_h6h3o4UhT0uZ3WwisgewNDRa9",
  "https://drive.google.com/uc?export=download&id=1XxMaq9f1BG4YewxoXOQ6dsQWljC6GQcb",
  "https://drive.google.com/uc?export=download&id=1Wc8pA6b6Irfa4fV3VzRgfoWGoXUZ1y57",
  "https://drive.google.com/uc?export=download&id=11vCGD97bW-flm2taYeEfNY02Ulz7n9Om",
  "https://drive.google.com/uc?export=download&id=1rnczTLUNF6EDxBL8_1Y7RVbunYQr5god",
  "https://drive.google.com/uc?export=download&id=11BG5el0560Uq72Fe9RokDs93ujar8D_d",
  "https://drive.google.com/uc?export=download&id=1b5yDKDfYjICSUg5MotiJRlQZdHNBzkUG",
  "https://drive.google.com/uc?export=download&id=1mtrh23kcrrfCwXuv4ocLqGhTWDVrKh3X",
  "https://drive.google.com/uc?export=download&id=1QxI9L2L2HfQpfEzqNIY1hk1awZa4uwt4",
  "https://drive.google.com/uc?export=download&id=1igzVW6dI9QRjfsqFhZGxGPpyVhObUbsR",
  "https://drive.google.com/uc?export=download&id=1AtgnwItTYu9uU6zaIoz6sniDksVdLWKp"
];

gmd(
  {
    pattern: "catvideos",
    aliases: ["catvideo", "cats", "catv", "meow"],
    react: "🐱",
    category: "fun",
    description: "Get a random cute cat video! 🐾",
  },
  async (from, Gifted, conText) => {
    const { mek, reply, react, botFooter } = conText;

    try {
      await react("🐱");

      const sessionId = `catv_${Date.now()}`;
      const downloadKey = `catvid_dl_${sessionId}`;
      const cancelKey   = `catvid_cx_${sessionId}`;

      await sendButtons(Gifted, from, {
        title: "⚠️ ADULT CONTENT WARNING",
        text: `🤖 *WAIT!*\n\nThese are *🔞Age Restricted Content Not funny cat videos* — not real cats!\n\This content is strictly for mature audiences only. Please confirm before proceeding.`,
        footer: `> *${botFooter}*`,
        buttons: [
          { id: downloadKey, text: "STILL DOWNLOAD 💋🔥" },
          { id: cancelKey,   text: "CANCEL" },
        ],
      });

      // ✅ FIX: destructure { messages } exactly like owner.js does
      const handleResponse = async ({ messages }) => {
        const messageData = messages[0];
        if (!messageData?.message) return;

        const selectedId = extractButtonId(messageData.message);
        if (!selectedId) return;
        if (messageData.key?.remoteJid !== from) return;
        if (selectedId !== downloadKey && selectedId !== cancelKey) return;

        Gifted.ev.off("messages.upsert", handleResponse);

        if (selectedId === cancelKey) {
          await Gifted.sendMessage(
            from,
            { text: "You look like a nobel boy! That's cool, keep it up 🙂🤝" },
            { quoted: messageData }
          );
          return;
        }

        if (selectedId === downloadKey) {
          try {
            await Gifted.sendMessage(
              from,
              { text: "⏳ Fetching your cat video, please wait..." },
              { quoted: messageData }
            );

            const randomIndex = Math.floor(Math.random() * CAT_VIDEO_LINKS.length);
            const videoUrl = CAT_VIDEO_LINKS[randomIndex];

            const response = await axios.get(videoUrl, {
              responseType: "arraybuffer",
              maxRedirects: 5,
              timeout: 30000,
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              },
            });

            const buffer = Buffer.from(response.data);

            await Gifted.sendMessage(
              from,
              {
                video: buffer,
                caption: `🔥 *Go easy, don't snap anything! 🚀😂* 🔥\n\n> *${botFooter}*`,
                mimetype: "video/mp4",
                gifPlayback: false,
              },
              { quoted: messageData }
            );
          } catch (dlErr) {
            console.error("Cat video download error:", dlErr.message);
            await Gifted.sendMessage(
              from,
              { text: "❌ Failed to fetch video. Please try again later." },
              { quoted: messageData }
            );
          }
        }
      };

      Gifted.ev.on("messages.upsert", handleResponse);
      setTimeout(() => Gifted.ev.off("messages.upsert", handleResponse), 120000);

      await react("✅");
    } catch (error) {
      console.error("Cat video command error:", error.message);
      await react("❌");
      await reply("❌ Something went wrong. Please try again.");
    }
  }
);
