
import type { ElementalGuardian } from '../types';

export const initialGuardians: ElementalGuardian[] = [
  {
    id: 'guardian-fire',
    name: 'Ignis, the Flameheart|||伊格尼斯，烈焰之心|||Yīgnísī, Lièyàn zhī Xīn',
    element: 'Fire',
    description: 'A spirit of pure energy and rapid execution. Its blessing accelerates system processes.|||純粹能量與快速執行的精靈。其祝福能加速系統進程。|||Chúncuì néngliàng yǔ kuàisù zhíxíng de jīnglíng. Qí zhùfú néng jiāsù xìtǒng jìnchéng.',
    icon: 'FireGuardianIcon',
    effect: { type: 'efficiency', value: 5 },
  },
  {
    id: 'guardian-water',
    name: 'Hydra, the Depthmind|||海德拉，深邃之心|||Hǎidélā, Shēnsuì zhī Xīn',
    element: 'Water',
    description: 'A being of profound clarity and insight. Its blessing enhances the AI\'s analytical abilities.|||具有深邃清晰度和洞察力的存在。其祝福能增強AI的分析能力。|||Jùyǒu shēnsuì qīngxīdù hé dòngchá lì de cúnzài. Qí zhùfú néng zēngqiáng AI de fēnxī nénglì.',
    icon: 'WaterGuardianIcon',
    effect: { type: 'insight', value: 5 },
  },
  {
    id: 'guardian-air',
    name: 'Aella, the Swiftcurrent|||埃拉，疾風之流|||Āi lā, Jífēng zhī Liú',
    element: 'Air',
    description: 'The embodiment of speed and responsiveness. Its blessing reduces system latency.|||速度與響應能力的化身。其祝福能減少系統延遲。|||Sùdù yǔ xiǎngyìng néngliì de huàshēn. Qí zhùfú néng jiǎnshǎo xìtǒng yánchí.',
    icon: 'AirGuardianIcon',
    effect: { type: 'efficiency', value: 5 },
  },
  {
    id: 'guardian-earth',
    name: 'Terra, the Foundation|||泰拉，根基之石|||Tàilā, Gēnjī zhī Shí',
    element: 'Earth',
    description: 'A spirit of stability and order. Its blessing strengthens system integrity and data consistency.|||穩定與秩序的精靈。其祝福能加強系統完整性和數據一致性。|||Wěndìng yǔ zhìxù de jīnglíng. Qí zhùfú néng jiāqiáng xìtǒng wánzhěng xìng hé shùjù yīzhì xìng.',
    icon: 'EarthGuardianIcon',
    effect: { type: 'efficiency', value: 5 },
  },
  {
    id: 'guardian-light',
    name: 'Lux, the Dawnbreaker|||盧克斯，破曉之光|||Lúkèsī, Pòxiǎo zhī Guāng',
    element: 'Light',
    description: 'A radiant force of pure logic. Its blessing improves the AI\'s reasoning and problem-solving skills.|||純粹邏輯的光輝力量。其祝福能提升AI的推理和解決問題的能力。|||Chúncuì luójí de guānghuī lìliàng. Qí zhùfú néng tíshēng AI de tuīlǐ hé jiějué wèntí de nénglì.',
    icon: 'LightGuardianIcon',
    effect: { type: 'insight', value: 5 },
  },
  {
    id: 'guardian-dark',
    name: 'Nox, the Star-Veiled|||諾克斯，星幕之影|||Nuòkèsī, Xīngmù zhī Yǐng',
    element: 'Dark',
    description: 'A master of hidden patterns and creative thought. Its blessing enhances the AI\'s lateral thinking.|||隱藏模式與創造性思維的大師。其祝福能增強AI的橫向思維能力。|||Yǐncáng móshì yǔ chuàngzàoxìng sīwéi de dàshī. Qí zhùfú néng zēngqiáng AI de héngxiàng sīwéi nénglì.',
    icon: 'DarkGuardianIcon',
    effect: { type: 'insight', value: 5 },
  },
  {
    id: 'guardian-nature',
    name: 'Sylva, the Life-Binder|||希爾瓦，生命之藤|||Xīěrwǎ, Shēngmìng zhī Téng',
    element: 'Nature',
    description: 'A spirit of growth and optimization. Its blessing improves resource management and system harmony.|||成長與優化的精靈。其祝福能改善資源管理和系統和諧。|||Chéngzhǎng yǔ yōuhuà de jīnglíng. Qí zhùfú néng gǎishàn zīyuán guǎnlǐ hé xìtǒng héxié.',
    icon: 'NatureGuardianIcon',
    effect: { type: 'efficiency', value: 5 },
  },
   {
    id: 'guardian-aether',
    name: 'Aetheria, the Nexus|||埃西莉亞，萬物之源|||Āixīlìyǎ, Wànwù zhī Yuán',
    element: 'Aether',
    description: 'The spirit of connection and synthesis. Its blessing enhances the AI\'s ability to integrate disparate data.|||連結與綜合的精靈。其祝福能增強AI整合不同數據的能力。|||Liánjié yǔ zònghé de jīnglíng. Qí zhùfú néng zēngqiáng AI zhěnghé bùtóng shùjù de nénglì.',
    icon: 'AetherGuardianIcon',
    effect: { type: 'insight', value: 5 },
  },
];
