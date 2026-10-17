import data from '@/data/useful-info.json';

export const SourceDescription = () => {
  const { title, footnote } = data.table;

  return (
    <section className="section pt-0!">
      <div className="flex cursor-pointer justify-between rounded-lg bg-accent px-4 py-5 transition md:py-7">
        <h3 className="max-w-64 text-center text-sm font-bold text-chocolate uppercase sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px]">
          {title}
        </h3>
      </div>

      <table border={1} cellPadding={0} cellSpacing="0" className="mt-9 shadow">
        <tbody>
          <tr>
            <td className="border border-solid p-4">
              <p>
                <strong>Характеристика джерела </strong>
              </p>
            </td>
            <td className="border border-solid p-4">
              <p>
                <strong>Приклад оформлення </strong>
              </p>
            </td>
          </tr>

          {/* Один автор */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Книги:
              <br />
              Один автор
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Лісовський П.М. Міжнародні відносини: ментальність,
                  геополітика, глобалізація: навч. посіб. Київ: Кондор, 2017.
                  156 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Два автори */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Два автори
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Михасюк І.Р., Михайлишин Р.В. Міжнародні економічні відносини
                  в сучасних міждержавних воєнних конфліктах: підручник. Львів:
                  ЛНУ ім. Івана Франка, 2017. 312 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Три автори */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Три автори
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Михайлов Б. В., Риженко С. А., Мороз С. М. Війна в Україні:
                  патоморфоз психічних і поведінкових розладів. Дніпро : Свідлер
                  А. Л. [вид.], 2019. 377 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Чотири автори */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Чотири автори
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Требін М.П., Герасіна Л.М., Поліщук І.О., Сахань О.М.
                  Політологія: підручник / за ред. М.П. Требіна. 2-ге вид.,
                  перероб. і допов. Харків: Право, 2018. 462 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* П’ять і більше авторів */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              П’ять і більше авторів
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Теорія міжнародних відносин. Міжнародні відносини та світова
                  політика: навч. посіб. / М.П. Требін, Л.М. Герасіна, В.Л.
                  Погрібна та ін.; за ред. М.П. Требіна. Харків: Право, 2016.
                  540 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Без автора */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Без автора
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Лібералізм : антологія / Наукове товариство ім. Вячеслава
                  Липинського ; упоряд. О. Проценко, В. Лісовий. Київ:
                  Смолоскип, 2002. 1122 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Багатотомне видання */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Багатотомне видання
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Правова система України: історія, стан та перспективи: у 5 т.
                  / Акад. прав. наук України. Харків: Право, 2009. Т. 2:
                  Конституційні засади правової системи України і проблеми її
                  вдосконалення / за заг. ред. Ю.П. Битяка. 576 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Законодавчі та нормативні документи */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Законодавчі та нормативні документи
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Про захист рослин: Закон України від 14.10.1998 р. № 180-ХIV.
                  Відомості Верховної Ради України. 1998. № 50-51. Ст. 310.
                </li>
              </ol>
            </td>
          </tr>

          {/* Перекладні видання */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Перекладні видання
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Парсонс Т. Соціальна структура і особистість: зб. творів /
                  пер. з англ. В. Верлоки і В. Кебуладзе. Київ: Дух і літера,
                  2011. 337 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Словники */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Словники
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Політологічний енциклопедичний словник / уклад.: Л.М.
                  Герасіна, В.Л. Погрібна, І.О. Поліщук та ін.; за ред. М.П.
                  Требіна. Харків: Право, 2015. 816 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Книги */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Складові частини:
              <br />
              Книги
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Яковюк І. В. Правова культура як детермінанта розвитку
                  правової системи.
                  <i>
                    {' '}
                    Правова культура в умовах становлення громадянського
                    суспільства:
                  </i>{' '}
                  монографія / за ред. Ю.П. Битяка та І.В. Яковюка. Харків:
                  Право, 2007. С. 45–89.
                </li>
              </ol>
            </td>
          </tr>

          {/* Збірника */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Збірника
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Требін М.П. Український транзит в контексті стратегії реформ.
                  <i>Гілея: науковий вісник:</i> зб. наук. пр. Київ: ВІР УАН,
                  2011. Вип. 50. С. 603–609.
                </li>
              </ol>
            </td>
          </tr>

          {/* Журналу */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Журналу
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Герасіна Л.М. Наративи міжнародної конфліктності – глобальна
                  турбулентність або деструкції світової системи?{' '}
                  <i>
                    Вісник Національного юридичного університету імені Ярослава
                    Мудрого. Серія «Політологія».
                  </i>{' '}
                  2020. № 2(45). С. 8–24.
                </li>
              </ol>
            </td>
          </tr>

          {/* Іноземного журналу */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Іноземного журналу
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Sanderson G. A Foundation for the Internationalization of the
                  Academic Self.{' '}
                  <i>Journal of Studies in International Education.</i> 2018.
                  Vol. 12. Issue 3. P. 276–307.
                </li>
              </ol>
            </td>
          </tr>

          {/* Енциклопедії */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Енциклопедії
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Требін М. Партія політична. <i>Політична енціклопедія</i> /
                  редкол.: Ю. Левенець (голова), Ю. Шаповал (заст. голови) та
                  ін. Київ: Парлам. вид-во, 2011. С. 543–545.
                </li>
              </ol>
            </td>
          </tr>

          {/* Тези доповідей */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Тези доповідей
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Герасіна Л.М. Практики і методи консенсуалізму в політиці та
                  конфліктній медіації.{' '}
                  <i>Modern science: problems and innovations:</i> The 2nd
                  International scientific and practical conference. Stockholm.
                  Sweden: SSPG Publish, 2020. P. 682–688.
                </li>
              </ol>
            </td>
          </tr>

          {/* Автореферати дисертацій */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Автореферати дисертацій
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Марченко Ю.В. Антитерористична діяльність як складова
                  національної безпеки (політологічний аналіз) : автореф. дис.
                  ... канд. політ. наук : 21.01.01. Київ. 2005. 20 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Дисертації */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Дисертації
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Винниченко О. М. Контроль соціально- економічного розвитку
                  промислових підприємств : дис. ... д-ра екон. наук : 08.00.04.
                  Київ, 2018. 344 с.
                </li>
              </ol>
            </td>
          </tr>

          {/* Електронні ресурси */}
          <tr>
            <td valign="top" className="border border-solid p-4">
              Електронні ресурси
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Про засади внутрішньої і зовнішньої політики: Закон України
                  від 01.07.2010 р. № 2411-VI. URL: https://zakon.rada.gov.ua/
                  laws/show/2411-17#Text (дата звернення: 20.04.2024).
                </li>
              </ol>
            </td>
          </tr>

          {/* Архівні документи */}
          <tr>
            <td className="border border-solid p-4" valign="top">
              Архівні документи
            </td>
            <td className="border border-solid p-4">
              <ol>
                <li>
                  Лист Голови Спілки «Первоцвіт» Г. Ф. Петренка на ім’я Голови
                  Ради Міністрів УРСР В.А. Поповича щодо реєстрації Статуту
                  Спілки та сторінки Статуту. 14 грудня 1989 р. ЦДАГО України
                  (Центр. держ. архів громад. об’єднань України). Ф. 1. Оп. 32.
                  Спр. 2612. Арк. 63, 64 зв., 71.
                </li>
              </ol>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-7 text-center text-xl leading-snug text-chocolate xl:text-2xl">
        {footnote}
      </p>
    </section>
  );
};
