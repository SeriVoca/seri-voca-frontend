import type { Wordbook } from '@/domain/wordbook';

export const MOCK_WORDBOOKS: Wordbook[] = [
  {
    id: 'wb-1',
    title: '기초 영단어 필수 100선',
    description: '영어 학습을 시작할 때 반드시 알아야 할 기초 단어 모음입니다.',
    type: 'SYSTEM',
  },
  {
    id: 'wb-2',
    title: '비즈니스 이메일 용어',
    description: '회사에서 메일 쓸 때 헷갈리는 표현들을 정리하고 있습니다.',
    type: 'USER',
  },
  {
    id: 'wb-3',
    title: '여행 스페인어 한입',
    description: '스페인 여행 가서 당장 써먹을 수 있는 생존 단어장입니다.',
    type: 'USER',
  },
];

export const MOCK_WORDBOOKS_10: Wordbook[] = [
  {
    id: 'wb-1',
    title: '기초 영단어 필수 100선',
    description: '영어 학습을 시작할 때 반드시 알아야 할 기초 단어 모음입니다.',
    type: 'SYSTEM',
  },
  {
    id: 'wb-2',
    title: '비즈니스 이메일 핵심 용어',
    description: '실무 이메일 작성 시 자주 쓰이는 격식 있는 표현들입니다.',
    type: 'USER',
  },
  {
    id: 'wb-3',
    title: '여행 스페인어 생존 단어',
    description: '스페인 현지 식당과 호텔에서 당장 써먹을 수 있는 단어장입니다.',
    type: 'USER',
  },
  {
    id: 'wb-4',
    title: 'TOEIC 고득점 필수 형용사',
    description: '토익 파트 5, 6에서 자주 출제되는 고난도 형용사 모음입니다.',
    type: 'SYSTEM',
  },
  {
    id: 'wb-5',
    title: '일상 생활 일본어 회화',
    description: '애니메이션이나 드라마에 자주 나오는 일상적인 표현입니다.',
    type: 'USER',
  },
  {
    id: 'wb-6',
    title: 'IT/개발자 영어 용어',
    description: '공식 문서 읽기나 스택오버플로우 검색 시 유용한 개발 용어입니다.',
    type: 'USER',
  },
  {
    id: 'wb-7',
    title: '수능 대비 빈출 영단어',
    description: '최근 5개년 수능 및 평가원 모의고사 기출 어휘를 정리했습니다.',
    type: 'SYSTEM',
  },
  {
    id: 'wb-8',
    title: '요리/레시피 관련 어휘',
    description: '해외 레시피 영상을 볼 때 필요한 주방 도구 및 재료 단어입니다.',
    type: 'USER',
  },
  {
    id: 'wb-9',
    title: '심리학 전공 기초 단어장',
    description: '심리학 원서 읽기에 꼭 필요한 학술적인 용어들입니다.',
    type: 'USER',
  },
  {
    id: 'wb-10',
    title: '뉴스/시사 고급 어휘',
    description: 'BBC나 CNN 뉴스를 청취할 때 자주 등장하는 시사 단어입니다.',
    type: 'SYSTEM',
  },
];
