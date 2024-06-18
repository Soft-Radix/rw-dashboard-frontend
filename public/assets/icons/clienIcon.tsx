import React from "react";
import { SVGProps } from "react";

export const HeadIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <mask
      id="mask0_48_23988"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}
    >
      <rect width={16} height={16} fill="url(#pattern0_48_23988)" />
    </mask>
    <g mask="url(#mask0_48_23988)">
      <rect width={16} height={16} fill="#757982" />
    </g>
    <defs>
      <pattern
        id="pattern0_48_23988"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_48_23988" transform="scale(0.005)" />
      </pattern>
      <image
        id="image0_48_23988"
        width={200}
        height={200}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAaDElEQVR4Ae2dC/w/1ZjHP7suG8JKlFwqFUnEIqotYZG1onJJrJfrhtilWJvakLIJ7Vq5rbuoCEvalbstsoSKZYvSZUsIIbdorXn7zdnmf/4zcy4z8/3OzPd5Xq/fa34z35lz+TznmTnnOc9FMhoagT+QtJ2kp0h6paQPSvqqpEsl/VjSbyRdLemHki6RdKakEyUdIWlfSbcZuoFWviGwaAQ2lLSfpPdL+oGk/+v4d1EhKG+W9KBCcK676M5YfYZAXwjsJOkESb/oKBBtAnWFpH+SdPu+Gm3lGAJDI/AwSZ8fUCjqBOZ/JX1A0g5Dd87KNwRyEfgTSZ9asGD4woKgvE3SrXM7Yc8ZAn0jsIGkYyQxOP0Bu6zzqyQ9ve+OWnmGQCoC95D03yMSDF8gT5V0q9RO2f2GQB8IPF7SL3sSDt74lxWq3HMlfat4+3+3x7Ipd8c+OmxlGAKxCBzVQTC+I+ndhUA8TRKaro1aKt1M0v0kHSjplOL408x6EeTHttRjPxkCvSDARt8bMgbpT4qpzhsl7dKxFdeT9IhyT+XXie1gjfTkjvXb44ZAIwIIx1sSB+X3i53xg4tF/E0aS83/YXNJr02civ1W0v75VdqThkAzAkcmCMc15QbeEILht3BLSScntI0vyZ5+IXZuCHRB4IkJA/C8YsCyJ7Jo2kfSlZHt/NmS2rhoTKy+BSBwt9KA0Feh1p1jWIjt1bJoi9LAsa5t/jVsum66rIZavfNA4AaSvhH5Vn75SLp8w0Kt+++RbcZWzMgQyEbg1ZEDjYX4mAgr3/dGtt3Uv2Pi3ITacldJLLb9qYl/fvRI+3R9SR+LaD/7MsucFo4UPmtWCIH/iBhcJ4UKWfLvDPyYKeJYpodLhsuqj0XgzyOEA5OQLmpc1gqPlPT6wvnpjIpX4eWSzpJ0XLnbvklsoxvuu7Oknwf68ytJ7NobTQyBPyx3n5kn32uBbf9sYECxl5Br33TL0vqX3XV/ulZ3zo45i+ltO/T/gIi6XtGh/JRHsQZ4QOlCjPAaZSJwx8Ks4myPsQzcoa1T/9Srs27Qvi6zT+xixwqGXy/rIaZCf5RRNy8a/Nv9MqvnGEz+cUbZKY/wkrvQa8eHJN0spRC7V3poGcSgykD3P956mH0MRe/0GOjqdUc241IHEoOar4Aro8uR/m+a0fl7R9T/zIxyYx+5uSRchOv6fr4k+5pEInlIhPNRV6O/pqbcSBK7zHVMdNcOb3q44TrCEaNNcuXHHL+ZuWb4aKBvCN9QhEVyW9/4gu01VOVzKJfBiVaoDUT3G6YfQ9DjAvWz2OVNmEJ9fTlc392RhTyYpdBugf5R9tYpBSbcG2MFjTHlSwaeISQ0eTy3YnB3TgTz3OBgkTcEvSvQBn5PoWcEynP9yT1iXZxKfH3a6nt2aoGR978wUG+1TcQLu3FkubO/jcGeEi8Kvf51BkIFFWuVUf7/D0yoF2UC0wa/jKZzgsZ9LyNMUOrL4u8DbWJwDkEEvQtNX6vYfL1wLNtmiIZMqcznRO5WO+AuLha7aLeGoDsFBg7apxTBxFfDtbvt+PEiTNCDK9opFBB3Lx2sYnbymWql0PaBdhHhEa3XEMT+UspLA4XIHkM0ZOxlEgnkHQFG+YPqM4WD0C0G7Bh7LX6d1XN8LmIJtWUoYBx7KSGtESrnmK8rURZTiC9VtW/+/1ulFJZ4LwJ6QaD+anvA6QWJdUz6dj61X0wACLBes4Awmy8NtOmgBNTZ76gyue5/Nu9iiA1JdrrrynDXjo8pqHJPyJCR4HdDEn74fDld+2OOKDuwPpg1oZ4lYkcMIO6et0riTTr03ycC7XpIAmc+HCiLwZFChwXKI5hDyvTvxYHyjl0A3vctdtRPD7TDjQF3ZDqJq/Es6akJjkcOkDEdU+LfEp29re0MjhRCoxOKaHLPhAJD08m2ti/7NzYbUVfPivYODJhlgx5Tf6yJB7vcbeUx/8+xBMBbsa3clL2hXQNltdUzht/YjxpKWbMUwfNtqsYAckobMBiMJTRQbWWzm51Dzw2UyzQslnAjbmvjFH5j43E2hCZiCqA3tfFHCZxgndVUDtf5EuQQCXTayk2xxkVL1VbWFH77zxwQx/pM6sJ8bAxibyCWQtbAuQKC70gbLuQJiSU24NrKmsJvWAHPhnBLnQLoTW1klzuWpiAghCVq6utUrhPmaDZEdJBPTpwpsUaKUxCQGI/JMQsKwTRmR0TaQL+eCvxHypx85OUb8g8zlra2xXo0TkFAQh6GXxoYa8fHLwcw9/mBsgQD0FkTGV7J5Op3vukcA8KdF4AIwaWb2sD1WDXqFAQEj8i2vsKjoYlA2iELgWobUY+jnl4Juo8kws1UAWj7H4EiXcCQhOFkWxswPoyhKQjIVwJ9JS3DUMRMAtOhNqz93/ii3XaoBo21XKJooKrzwWg75803VOpjdrfb6sbMPobGLiAYUrap3bEgTnXEisGFezaW9OkAzj4PiO6CcetKErvT2Fr5oLSd5zgJxYDLoAjl3IgxNxm7gIS8JlPN52Ow5R4C2aVsGCOouOkaScKLDVVqm2BUf+sSAqcN8FC4H7ziQjR2AWH/oIql/z8JSYeglAj52LL92RCNmHKZu7dEvfCZ+ISBOhpyCyVYXMiOaswCwrQ29CJK9VCMZUWsA9lXC18hXLCNahDAlJlPvC8Q/jlpyIYgvkx+Xf55yFdizAISSgKEc9ZQa7x/iMCWoB1DrX+GGC9LKROnmLZIINhFDenQj8bEF4rqOc5ebTRWAcFJKRS0jn2qoYiU2UQtqWLp/kdpQLgnowQEcLP0tS2oex+eUEbOrTHegI9pKXisAsLawg3IpiNWvkPSi2ragJ0bgQKNMhDgrcMG3qml7ny7jDJSH+ETH3J4urTlKzZGASGVQ2jtcVoqUJn3s8YhHgEWEoRSxQXbaGIIhFxSeQM3qZvHJiCoV0Mbg/QnxaV4Yuy05vaNALF3Q18RBhV7Cj6NTUBismR9zu+EnRsCIQRCpicICKF98CCs0pgE5C9r5vy0u/rHwnlI05IqNvb/jBBA3RkTDpVMVFUai4CgDYxJC40lg5EhkIUASoLQ4pY3MP4ujsYiICHbMr4il1luDsc2O+YicKg3JalOT/gfAakGNJuKgKBCN3OO3FFhz/0/AsSpRSXpC4Y7x36rSmMRENTV7DG4dvpHNHVGhkAvCKDVItq4P8iIz+QHbBuLgNBxDATrdq8x6QjZlPUCnBWyOgjgR0HkkG+X4VPfL4lAzD6NSUBoG9HRCfz9fUkYAhJjOCVMqd8/OzcEOiEwNgHp1Bl72BDoGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhYAJyKzYaZ3pGwETkL4RtfJmhcBYBITcKztIImHn3qXjFOcrm4xmVqNswp1ZpoDcVNKzJBGKqCkPJEmCTi/81Yn7RUBrI0NgoQgsS0DOjYje7vvU/6zI/PQySzmw0PGx8pUtS0D8wZ9yfmERueXeK885A2AhCExRQBAmpmRtaR0WAp5VMn8EpiogCAnB5B41fxZZD5eJwJQFBCH5ZU1A7mXiaXXPDIGpCwhCwoIfNbGRIdA7AmMSkG9KelMx2Emg+XpJX6uJDolA1P0d3DsyVqAhIGkMAnJBuTFYxxDaR4TFOqGoXiOBkGWcrUPQrnVCYNkCQhZeYgm3EekayPtYFYi6//+qrRD7zRDIQWCZAkL83U0iG71hkULuWwEh+WRkWXabIRCNwDIF5OnRrVy78WEBAfmVlxwosXi73RBYH4FlCQhmI9VEPuu3bP0rpEC4KCAkO67/mF0xBPIRWJaAfCyzyW8OCMh+XrnXk3SnwuCRfOdYCu8maStJJBoyMgSCCCxLQFDj5tDfBgTkAEk3kfQMSaxJmHbVLeivKpIJnVLkT3mCTcty2LA6zyxLQEjuk0OYx9cNeHcNrdhPAve4e93xe8Uzz5VEpmAjQ2AdBOYmIG7Q5xy/ImmbddCxk5VHwARk3S8SiURJSW1kCPweAROQdQWEL88vSgsDGyKGwNJMTYZag+RMreqewXTldjY+DAH7gqz/BXECg6+8pZ9ecRlZBQHBROXthfr3mGIP5DhJFydouR6/4uNj5bs/ZwHBT+RBNRzmq7CXpEsiBAUTfNtUrAFxVS7NVUCYHt04wMSNJaHadVOqpiM78EYrisAcBYQpVMiE3rF7M0lXBISEaZnRiiIwlIA8PDDojs7EO7STzlcgNZDDMwNtvTyzrfbYDBAYSkA2l/TbloGXG7InJCDfyVgz4JD105a2InS3nQGvrQsZCAwlIDQF//K6ef1ZkrCyzaGQgOROh/6toa2u/ffzGkv7ty3CpnL9gZJ2Kvp7a+8eO+2AAHNkpgKvkvTxMjIHm1MY2uFp943S2pRQmywSh/K3HlJAGET0j9A8DDS+KB+UdMsOuIUE5LDMsv8xICAE1L6ZpGcXpiifbrES/kFhXv+eUktmxo+JzLhOCdxHJP0mwBD35nJHzB9OlHT/xDpDtw8pIK5uHKPuLOnm7kKHI37nDpO6IwM4h44IlHuaJJy86upsuvbt0pw+pz0r9wxzbvTyTWCmXP+CpN17QnARAtJTU39fzN0DGObG7A0JSAp//Hs/IWnTPkGYU1no4nHM8UHr4/z48rPfBa+pCQh9fW8DnkzfcmlIAYHXl0naPrdxc33u+mVuiz6EoamM/5F0rw4ATlFAiKL46tLqFlxY4xzb0TNwaAGhnawxcf81KhE4suFN1zTYc6+zPnlEJupTFBDXVQQFdXIfYUcXISDwl3VJ7Cam6+csj5gxOO1N7sBPeY5MTGzOpdKUBSS1r233L0pA4ClT45Wn/TO+Hniz4R/NFyFFONy9BCi4TyLyJiBrgOUIyHmS3lFo515TaOlOKtXzjheho7+vksi26d8OcCGQ2PXF5AKNlG9Yh9aDL8JbJBGBI1SW+x2zCOyLYskEZA2pFAE5pwwf5GPMvseTiryL7IU4fjQdURuvNLH51wQO159f5NtjER9DzFlhYFMIG7+ez0hizyWGTEDWUIoVEDSSmKa00RblWsPni39+t7ZC5v5byHSBHeFU2q7cYfeBrjt/SWThJiBrQMUIyH9FCIeDHW1VaKr8cnfzKh7xua4buO4a5iT+tCoGJ1InkxbZldN0JD1ZzK67Ccga6jECkrpuCJWJTdrKEvZTTYPXXY99y/sgIlgxOTNYj4TsnkxA1tB9aYBfJPNJJdaRvKgcv/0jv/Whok5t1yjuZw0QCtePbU+uCQLxZWMiCBIDt81l1ARkbbiwuPYHcPX8lZmjKuSxiEXwytJjA6DDgNwYtYCKNXCViU3/H9LCAROQNXBQhLQZI6ZOrxzkJwR4tLO7cRWPBAf4cgAgrHrv2AEcBKxJMNz1a1oCoZmAXAs+Aa8dZtVjl429kICsfBRHnGmqYNf9/6/X8ij5vw0KM5OzI+rAZqvO3NwEZF3IMdn5nKQrS43hQQkq83VLWjtD5V7Hc3fNbLMksQ5wgDQdd6lDN/LaHSI3E1E9+4HQTEAiQc68jd32Jp5z3eyyykT3bf7ZAHVGJgPcY48LMMIx6XnugfJoAuIB0vNpm687tnpGJQLvihjAj+yIVij7EkKCUWPVqcgEpCPoLY/jJu1eTHVHLHuNSgQwPwiZipzfIZgB1WACgb6+jhnVa+T5c592E5DhhujWAV6w1jGqIEAAg+pArfv/byr35/zLou/nEfV8oCzcBCQH5bhndg3w4X1xxazOXUTF+FEANCxB3ds9F5knBupwgkmAAxOQXJTDzz06wAfM5I08BFAbugHadMzdta1WFWNuf3WhzuSL1dQOrhNJxSgPgRC2L8wrdt5PYXtzYWBQslbZsiMMLBCJrdU2+Pkt5PVoApLPiKMC+GPeYlSDQIwJCsHHutJdIkyuQwJkApLPhdBXfI/8ouf9JJt1xLYKDU7CWXalp0XU09YOE5B8DoQ2iHfIL3r+T4Y0HAzaz/cEA7ZEbULQ9psJSD4TQir3kCtCfs0zeRIbrLbByW/79tBX/EfIlBSqq+53E5B8BrT5pmOk6pv95Nc00ydJWs/Odt3AdNfY1MMgsSvh/xzaqHR1Vo8mIHnIE2+giqP//6V5xa7eU0QI9MHzzw/uCZZQohi/Xs5NQPLAJ4V0HZ7u2pl5xa7eUxtFbB5i8LZJT9A0xbV1jPOPJiB5wGPv5mNZPT85r9jVfOrAAJgAiyFiH0TQhwsi6nPMNAHJQx2/Eodh3fGNecWu5lPMV0P+6zj49xVH6Z6S2EWvY5x/zQQkb0w2eSc6fF+cV+zqPhV64wAs3ml9UcgMwjHSBCQP8cMDLyBC0xolIkBqLzcwm477JJbZdnuMmtkEpA3B5t+a8jM6vu7Z/Kj90oQAU6i2OEqAi5NNH2pf2oB1MWpkx7S649ubGmvXWxEIJU3qktOlteK5/xjjFdinFSjR4Nv2YsgJaJSOQCiazW3Si7QnQAB1bpsfM2954jf1mXL4OQ1fEaKYr2zkv47Dkcj9dV9krhGfIDcNdsdmzePxF7SA60DHx71PekoRuv/isl523CmfJEBG6QgQyZJYZI5X/pG4zEYdEIhR+wL6EFH5WJfY260D88pwsr5QVM/5Mht1RIDkOVVQ6/7/UiDubscm2OOZCIRSVZ+aWa495iEQ8idAaPD3MBoXAqHI/m8bV3On2xoS5mAWXff1cNcwqcaey2g8CLCec/ypO75sPE2dfktCiXhgwOum381Z9eDQgIAQTcaoJwQwLkTrUfcmctfYXGTeazQOBF4b4FfXCJrj6OWIWvHUAOAIClH6zENtHEwjKJ97edUdiUVm1CMC6NW/GAAdRlgYmR5B71AUsQTqBMNdIzuYUc8I7FjuwDqQ645MxdjHMFouAiH7thsut3nzrT3GTqtLSrf5IrfYnrX5/pNX0mggBDD9CMX2ZcFulqIDMSCiWLJ41X3d3bVzI8qwWzogEPJUgxFkViXLrtHiEdg+ICD4/BgNiAALdiJiuDdS0xELXaPFI/DQAG/6NjJdfA8nUCM+5SHHqquKQA/mc7B4ZrIJ2PTS4vqRi2/SatbI7nkbI/itS/bc1US1e69Dm4SYoRgtAAGS7Hw3Qkj2XkBbrIprETg9wBPbJLwWq8H/i0mjgGcb5ipGwyPA+jDkDWr7VMPzYZ0aPhp4YzHV+pd1nrCToRAgnUHbtJfESUYLRuD2EUly8IHefcHtWsXqQgt0wr4aLQGBvwu8uXirEW7UTByGZc6HA3zomsF42NbPuPTrSjo7wByE5J9njMGyu8bL5xcBHvQVOnbZfZ1k/fcIRNJAQJhq7TbJ3o2/0aHQsWgczR1hyXx8ReANhpAQmZGMU0b9IhBKK2ERKvvFO6u0G0SmWntrVun2UBMCqG5D6bSJUmM0AgR2iTBD4Uuy1wjaOpcmhLRXmLjz8jIaCQLHREy1iIbSZ/jSkXR94c1gXXFeAG8L87NwtrRXyNsqxDS+IqeZWXw7kBG/xgT4u29EOXbLghHAaSoUUwshMevSbowhuiU4Nv2Zg1Q3fAd9+rAWxjmGYjZvb7g8NmAI6nBsOh6QV7Q9tQgE8Co8I4KJlxf2WpstokEzqoMA36Fp7A/NemH8HN9C0pURQvIF07QkMfP5EZjyBTeaAAKodJumANXr77No8VHc3LJMYlTFzv+f4BrmZhAF5zhuwg7LZ2LduYUNaucXPh+fisCSL4zRhBAgldpZEYxFaI6aUL8W3dSYqVWfiVYX3b+Vrm/ryPUIQmIh+tcfKrtGqs4xXDSaKAJ7RFj9uqkXO/JmgbrG6NtFxgD40ETHhTW7ggC6eScEoeM7JeFvssqEMeLXIjBDW3irVQZqTn0/OoLhTnhIBUcUlVWkG0XuJYHVY1YRoDn3+U0JQoLJxDZzBqOmb/jNhML4uJeIuRDUADj1S6gsj08QEqYQqxJn6xaS2Dx1AtB2xN3ZzNmnLg0N7ccc5bjIgeAGCdEDURvPlbYtg1y4/rYdycmCtYLRjBHgS5Iy3WLAsGidY5qFfSTh4NQmFO63n0vaacbjwrrmIXB45MBwA+Sawr/9VTMxyGMxfmxC/6+W9GAPPztdAQT2j9wMc0LCkYiB+054z+QBks5PEI5fr9BabAWGfHoX7y8Jl9yqEMT8z6KW3eapEEaHoWgkfr9Jr/YXU+mgtXM4BFh4xgSj8wcQ52RReshwTetc8uaSSB/Bl6Cu/U3XsNC1EK6d4Z9PAaguY/KQNA0oFvJPHlEcLr5uqLVjXJH9PhG6Fe2WkSGwHgJ7Sroi8W1bHWCE5DyxnJos2mzlLkW7XxQZL6za5ur/pxRhWzdaDxW7YAhUENhU0kkdhMQNuB9LOrmwKiaQM4O3b2NI1hXkTUFtjfLA1ZtzRFNFYPC+21iB1f6dGwIkqbyo48CrDlb8tj9b5FMkB/zzyq/MjuV0hrhdmHuwT8PG5IaSEFSmOjtLenSRsObAchrIuodNu2rZXf5n/XXXuTHP+rMYBIhkfoQkNsq6DMIxPkuGqIPMgnkxA2nutfA2z9EGjVEwWLgzLTNz9bmP2iX0b6tycIUCOI9VMMhdfocl4GZVrhgCGxcq1EMkXTaBqRd7GnhM4iloZAgsFAGCqhFq6D0jW6cwjSLp6X5FYIoNFoqIVWYINCCAESB2WsTcQmO16GkWXwrqfpLtZTRwyC6PBgH2E9j7eFa5p3JJmRauL6HBuphwoCdI+uvSHB9/FyNDYLIIoDImv/ijimgrhxb7HG8oXHvfXW4msrdxZvHb14sp2znl/6RsYKORlGaknEMQCLOD4M3ZiSuZwb8DDcHbUFbsqwYAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);
export const UpArrowBlank: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M12 10L8 14H16L12 10Z" fill="#9DA0A6" />
  </svg>
);
export const ChatEditIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="11.5"
      fill="white"
      fill-opacity="0.36"
      stroke="#4F46E5"
    />
    <path
      d="M9.0514 14.3947L15.1455 8.30063L14.2959 7.45099L8.20176 13.5451V14.3947H9.0514ZM9.54952 15.5965H7V13.047L13.871 6.17593C13.9837 6.06328 14.1365 6 14.2959 6C14.4552 6 14.608 6.06328 14.7207 6.17593L16.4206 7.87581C16.5332 7.98849 16.5965 8.1413 16.5965 8.30063C16.5965 8.45996 16.5332 8.61277 16.4206 8.72545L9.54952 15.5965ZM7 16.7982H17.8158V18H7V16.7982Z"
      fill="#4F46E5"
    />
  </svg>
);
