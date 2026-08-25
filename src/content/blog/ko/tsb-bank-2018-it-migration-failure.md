---
title: "3억 3천만 파운드의 마이그레이션: TSB 코어 뱅킹 전환 실패의 전말"
description: "TSB가 520만 개의 고객 계좌를 Sabadell의 Proteo 플랫폼으로 마이그레이션하려고 시도했을 때, 부적절한 API 성능 테스트와 액티브-액티브 데이터 센터 구성 오류로 인해 고객들이 수 주 동안 계좌에 접근하지 못하게 되었습니다. 이는 모놀리식 IT 통합의 극단적인 위험성을 보여줍니다."
author: "The Archivist"
pubDate: "2026-08-25"
slug: "tsb-bank-2018-it-migration-failure"
heroImage: "/hero_tsb_bank.jpg"
incidentDate: "2018-04-22"
incidentPeriod: "2018-04-22"
incidentEndDate: "2018-12-15"
systemTypes: ["Core Banking Systems", "Microservices Migration", "Enterprise IT Architecture"]
financialLoss: "£330 Million"
lang: 'ko'
keywords: ["Sabadell Proteo system", "Paul Pester TSB CEO", "Core banking platform migration", "IBM IT audit TSB failure", "Slaughter and May TSB report", "FCA fine TSB IT failure", "active-active data center configuration"]
summary_points:
  context: "로이드 뱅킹 그룹(Lloyds Banking Group)에서 분리된 TSB Bank는 520만 개의 고객 계좌와 운영 시스템을 기존 로이드 IT 시스템에서 새로운 Sabadell Proteo4UK 코어 뱅킹 플랫폼으로 마이그레이션해야 했습니다."
  systemic_failure: "이 마이그레이션 계획은 새로운 Proteo4UK 마이크로서비스 아키텍처를 통합하는 데 따른 복잡성을 심각하게 과소평가했습니다. 특히 결정적인 문제는, 액티브-액티브(active-active) 데이터 센터 구성 전반에 걸쳐 포괄적인 볼륨 및 스트레스 테스트를 수행하지 않아 프로덕션 환경에서 대규모 병목 현상이 즉각적으로 발생했다는 것입니다."
  technical_mechanisms: "최적화되지 않은 API 쿼리는 전례 없는 데이터베이스 트래픽을 유발했습니다. 액티브-액티브 데이터 센터 구성은 비동기 복제 지연과 심각한 스레드 경합(thread contention)을 겪었으며, 이로 인해 고객용 디지털 뱅킹 포털이 멈추거나, 시간 초과가 발생하거나, 다른 계좌 세부 정보가 노출되는 문제가 발생했습니다."
  fallout: "이러한 시스템 장애로 인해 수백만 명의 고객이 수 주 동안 자신의 계좌에 로그인할 수 없었으며, TSB는 복구 및 고객 보상에 3억 3천만 파운드를 지출해야 했습니다. 또한 FCA와 PRA로부터 4,865만 파운드의 규제 벌금을 부과받았고, Paul Pester CEO는 결국 사임했습니다."
primary_sources:
  - title: "FCA Final Notice 2022 - TSB Bank plc"
    url: "https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf"
  - title: "Slaughter and May Independent Review of the TSB IT Migration"
    url: "https://www.tsb.co.uk/news-releases/slaughter-and-may-report/"
  - title: "Treasury Committee Oral Evidence: TSB IT Failure"
    url: "https://committees.parliament.uk/committee/158/treasury-committee/"
---

2018년 4월에 발생한 TSB Bank의 코어 뱅킹 마이그레이션 장애는 현대 영국 금융 역사상 가장 구조적으로 치명적인 엔터프라이즈 소프트웨어 실패 중 하나로 기록되어 있습니다. TSB가 520만 개의 고객 기록을 기존 로이드(Lloyds) IT 시스템에서 Banco Sabadell이 새롭게 맞춤 제작한 Proteo4UK 플랫폼으로 이전하려고 시도했을 때, 프로덕션 트래픽의 무게를 견디지 못하고 운영 시스템이 즉시 붕괴되었습니다.

이러한 실패는 단순한 불편함을 넘어섰습니다. 수 주 동안 수백만 명의 고객이 디지털 뱅킹에 접속하지 못했고, 기업들은 직원들의 급여를 지급하지 못했으며, 일부 고객은 완전히 다른 예금주의 금융 정보를 보게 되는 심각한 문제가 보고되었습니다.

초기 조사는 소프트웨어 마이그레이션 일정과 테스트 절차에 초점을 맞추었습니다. 규제 기관의 문서와 독립적인 조사 결과에 따르면 아키텍처 검증 과정에서 근본적인 실패가 드러났습니다. 듀얼 액티브-액티브(active-active) 데이터 센터에서 작동하도록 설계된 이 시스템은 실제 프로덕션 워크로드를 반영한 전체 스트레스 테스트를 배포 전에 충분히 거치지 않았습니다. 그 결과 3억 3천만 파운드의 운영상 재앙과 4,865만 파운드의 규제 당국 벌금이 발생했으며, 이는 모놀리식 코어 뱅킹 전환의 극단적인 위험성을 명확하게 보여주는 사례가 되었습니다.

## TSB Bank란 무엇인가 (What Was TSB Bank?)

TSB Bank plc는 영국의 소매 및 상업 은행입니다. 원래 로이드 TSB(Lloyds TSB)의 산하에서 운영되었으나, 2008년 금융 위기 이후 유럽연합 집행위원회(European Commission)의 국가 보조금 규정을 준수하기 위해 2013년에 독립적인 법인으로 분리되었습니다. 2015년에 TSB는 스페인의 은행 그룹인 Banco Sabadell에 인수되었습니다.

인수 후, Sabadell은 8억 파운드 규모의 대규모 통합 프로젝트를 시작하여 TSB의 전체 백엔드 운영을 임대 중이던 Lloyds Banking Group 인프라에서 벗어나, Sabadell의 자체 뱅킹 소프트웨어 플랫폼을 맞춤형으로 수정하여 구축한 Proteo4UK로 마이그레이션했습니다. 이 마이그레이션은 Sabadell이 장기적인 비용 시너지 효과와 운영상 독립성을 달성하기 위한 필수적인 요구 사항이었습니다.

## 불일치 분석 (The Forensic Discrepancy Matrix)

| 파라미터 (Parameter) | 기존 Lloyds IT 운영 | Sabadell Proteo4UK 구현 | 증거 상태 (Evidence Status) | 메커니즘 (Mechanism) |
| :--- | :--- | :--- | :--- | :--- |
| **데이터 센터 아키텍처** | 안정적인 단일 소스(single-source-of-truth) 토폴로지를 갖춘 검증된 레거시 메인프레임. | 영국 전역에 분산된 듀얼 액티브-액티브(active-active) 데이터 센터. | [DOCUMENTED] | 두 물리적 센터 전반에서 읽기/쓰기 작업을 동시에 실행할 때 전례 없는 동기화 지연 및 스레드 경합(thread contention) 발생. |
| **성능 테스트 범위** | 표준 용량 계획에 사용되는 과거 트래픽 기준선(baseline). | 격리된 마이크로서비스에 대한 합성 부하 테스트는 진행되었으나, 엔드투엔드 글로벌 볼륨 검증 누락. | [DOCUMENTED] | 중요한 API 게이트웨이는 프로덕션 환경의 동시 다발적 부하가 아닌 고립된 환경(silo)에서만 테스트됨. |
| **전환(Cutover) 전략** | 점진적인 데이터 스테이징 및 병렬 운영. | 4월 20~22일 주말 동안 520만 개의 계좌를 동시에 마이그레이션하는 엄격한 "빅뱅(Big Bang)" 방식. | [DOCUMENTED] | 기본 원장(ledger) 전환이 시작되고 일요일 저녁에 검증이 완료된 이후 롤백(rollback) 기능의 완전한 부재. |
| **사고 대응** | 성숙한 진단 원격 분석 기능을 갖춘 확립된 레거시 명령 구조. | TSB의 영국 경영진, Sabadell의 스페인 엔지니어링 팀, 외부 IT 도급업체 간의 단편적인 커뮤니케이션. | [RECONSTRUCTED] | 엔지니어들이 새로운 마이크로서비스 아키텍처의 어느 계층이 병목 현상을 일으키는지 즉시 식별하지 못해 진단이 지연됨. |

## 제1막: 모놀리식 야망

2018년 초까지 TSB는 심각한 상업적 압박에 직면해 있었습니다. 이전 모회사인 Lloyds로부터 IT 인프라를 임대하는 데는 매년 수억 파운드의 비용이 들었습니다. Banco Sabadell의 지시는 명확했습니다. 520만 명의 고객 데이터, 트랜잭션 기록, 자동 이체 및 모기지 원장을 모두 새로운 Proteo4UK 플랫폼으로 이전하는 것이었습니다.

Proteo4UK의 아키텍처적 목표는 엄청났습니다. 이 시스템은 수십 년 된 모놀리식 레거시 코드를 실시간 처리 및 신속한 기능 배포가 가능한 최신 서비스 지향 아키텍처(SOA)로 대체하기 위한 것이었습니다. 새로운 인프라는 액티브-액티브 데이터 센터 구성에 크게 의존했습니다. 즉, 물리적으로 분리된 두 개의 데이터 센터가 트랜잭션을 동시에 처리하고 지속적으로 상태를 동기화하여 '무중단(zero-downtime)' 고가용성을 보장하는 방식이었습니다.

하지만 코어 뱅킹 원장을 이동하는 것은 소비자 웹 애플리케이션을 업데이트하는 것과 근본적으로 다릅니다. 금융 원장은 엄격한 트랜잭션 무결성을 요구합니다. [FCA 최종 통지서](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf)에 기록된 바와 같이, 프로젝트 팀은 그 복잡성을 인식했음에도 불구하고 결국 "빅뱅(Big Bang)" 마이그레이션을 단행하기로 결정했습니다. 단 주말 동안 모든 기존 시스템의 전원을 끄고, 데이터를 전송한 후, 새로운 시스템을 부팅하는 방식이었습니다.

> **증거가 입증하는 것:**
> TSB 리더십과 IT 제공 도급업체(Sabadell Information Systems - SABIS)는 4월 전환 이전에 완전히 통합된 Proteo4UK 플랫폼에 대해 포괄적이고 종단 간(end-to-end) 성능 및 볼륨 테스트를 실행하지 못했습니다.
> 
> **증거가 입증하지 않는 것 (What the evidence does NOT establish):**
> 특정 개발자가 악의적으로 코드를 방해했다는 증거는 없으며, TSB 경영진이 플랫폼의 준비 상태에 대해 고의적으로 고객을 기만하려 했다는 증거도 문서화되어 있지 않습니다.

## 제2막: 액티브-액티브 병목 현상

2018년 4월 20일 금요일 저녁, TSB는 데이터 마이그레이션을 시작하기 위해 디지털 뱅킹 채널을 오프라인으로 전환했습니다. 주말 내내 수십억 행의 데이터베이스 레코드가 이식되었습니다. 일요일 저녁 무렵 내부 테스트 스크립트는 데이터가 성공적으로 이동되었음을 보고했습니다. 은행은 마이그레이션 성공을 선언하고 고객들에게 디지털 문을 열었습니다.

재앙은 즉각적으로 찾아왔습니다.

일요일 오후 4시, 고객들이 새로운 모바일 앱과 웹 포털에 로그인하기 시작하면서 액티브-액티브 데이터 센터 아키텍처는 최초로 진정한 프로덕션 부하에 직면했습니다. 시스템 성능은 즉각적으로 저하되었습니다.

근본적인 실패 메커니즘은 단순한 구문 오류(syntax error)가 아닌 아키텍처 문제였습니다. [Slaughter and May](https://www.tsb.co.uk/news-releases/slaughter-and-may-report/)가 수행한 독립적인 조사에 따르면 마이크로서비스가 통신하는 방식에서 심각한 결함이 발견되었습니다. 고객이 로그인할 때 디지털 프런트엔드는 백엔드 원장으로 비효율적인 API 쿼리를 엄청난 양으로 생성했습니다.

아키텍처가 액티브-액티브 방식이었기 때문에 이러한 쿼리는 두 데이터 센터 전체로 라우팅되었습니다. 대규모의 비효율적인 쿼리는 미들웨어 애플리케이션 서버의 스레드 풀(thread pool)을 포화 상태로 만들었습니다. 게다가 두 데이터 센터 간의 동기화 요구 사항으로 인해 심각한 지연(latency)이 발생했습니다. 데이터베이스 연결은 고갈되었고, 디지털 게이트웨이는 단순히 멈춰버렸습니다.

잔액을 확인하려는 고객들은 끝없는 로딩 화면, 일반적인 오류 코드, 강제 로그아웃(timeout)을 경험해야 했습니다. 더욱 경악스러운 부분은 극단적인 스레드 경합과 캐싱 실패로 인해 세션 누수(session bleed)가 발생했다는 것입니다. 이로 인해 일부 고객이 로그인했을 때 일시적으로 다른 사용자의 계좌 세부 정보와 잔고가 화면에 노출되는 치명적인 문제가 보고되었습니다.

## 제3막: 운영 시스템의 연쇄 붕괴

기술적 장애는 즉각적으로 인간 운영 시스템의 붕괴를 초래했습니다. 디지털 방식으로 자금에 접근할 수 없게 된 수십만 명의 TSB 고객들은 콜센터와 실제 지점으로 몰려들었습니다.

하지만 콜센터 역시 전화를 처리하기 위해 동일한 Proteo4UK 인프라에 의존하고 있었습니다. 내부 은행원 포털(teller portal)도 모바일 애플리케이션을 마비시켰던 것과 동일한 API 시간 초과 및 스레드 고갈 문제를 겪었습니다. 대기열은 몇 시간으로 늘어났습니다. 창구 직원들의 터미널 화면에 잔액 정보가 로드되지 않았기 때문에 지점 직원은 분노한 고객을 돌려보내야만 했습니다.

분산된 아키텍처 특성상 사고 대응은 심각하게 지연되었습니다. SABIS의 엔지니어와 IBM의 외부 감사팀은 프로덕션 환경에서 마이크로서비스 아키텍처에 성숙한 엔드투엔드(end-to-end) 추적 원격 분석 기능이 부족하여 병목 현상을 정확히 짚어내는 데 어려움을 겪었습니다. 하드웨어 수준에서 데이터베이스는 정상으로 보였지만, 미들웨어 API 게이트웨이는 완전히 교착 상태에 빠져 있었습니다.

TSB는 순차적 재부팅(rolling reboot)과 용량 확장을 배치했지만, 비효율적인 쿼리를 리팩터링(refactoring)하지 않았기 때문에 시스템은 수 주 동안 불안정한 상태를 유지했습니다. 이 위기는 전국적인 헤드라인을 장식했고 즉각적으로 영국 재무 위원회(Treasury Committee)의 정밀 조사를 불러왔습니다. 은행의 명성은 치명적인 손상을 입었습니다.

## 시스템 예방 플레이북 (Systems Prevention Playbook)

TSB 마이그레이션 실패는 통합 위험을 보여주는 대표적인 사례입니다. 다음의 아키텍처 방어 메커니즘은 핵심 금융 시스템 전환을 위한 최소한의 표준을 나타냅니다.

| 방어 클래스 (Defense Class) | 구현 전략 (Implementation Strategy) | 증거 요구 사항 (Evidentiary Requirement) |
| :--- | :--- | :--- |
| **1. 종단 간 볼륨 테스트 (End-to-End Volume Testing)** | 독립적인 마이크로서비스의 합성 벤치마크에만 전적으로 의존해서는 안 됩니다. 전체 프로덕션 규모의 데이터 토폴로지를 사용하여 예상 최고 부하의 200% 수준에서 글로벌 통합 볼륨 테스트를 의무화해야 합니다. | 전환(cutover)을 승인하기 전, 통합 부하 테스트 결과에 대한 독립적인 감사 및 서명 절차. |
| **2. 점진적 전환 라우팅 (Incremental Cutover Routing)** | "빅뱅(Big Bang)" 방식의 네트워크 플립을 거부합니다. 카나리 배포(canary deployments) 및 점진적 트래픽 라우팅(예: 사용자의 5%만 새 플랫폼으로 유도)을 구현하여 실시간으로 데이터베이스 스레드 성능을 검증해야 합니다. | DNS 또는 에지 라우팅 계층에서 구성이 활성화된 트래픽 셰이핑(Traffic shaping). |
| **3. 회로 차단기 미들웨어 (Circuit Breaker Middleware)** | 다운스트림 서비스에 지연이 발생할 때 백엔드 데이터베이스 스레드가 고갈되는 것을 방지하기 위해 API 게이트웨이 계층에서 엄격한 회로 차단기 패턴을 구현해야 합니다. | 하드 타임아웃(hard timeouts) 및 폴백 캐싱(fallback caching)을 증명하는 애플리케이션 서버 구성. |

[나이트 캐피탈 거래 결함 (Knight Capital Trading Glitch)](/blog/knight-capital-trading-glitch-45-minutes) 및 [타겟 캐나다 공급망 붕괴 (Target Canada Supply Chain Collapse)](/blog/target-canada-supply-chain-collapse)와 같은 유사한 아키텍처 고장 사례에서 볼 수 있듯이, 빠른 롤백(rollback) 메커니즘 없이 테스트되지 않은 모놀리식 변경 사항을 배포하는 것은 사실상 복구할 수 없는 사고를 보장하는 것과 같습니다.

## 엔지니어링 진화 (Engineering Evolution)

| 역사적 시대 (Era) | 아키텍처 접근 방식 | 장애 도메인 | 현대적 방어 패턴 |
| :--- | :--- | :--- | :--- |
| **과거 (2018)** | 단일 주말에 진행된 "빅뱅(Big Bang)" 모놀리식 전환. | 롤백 불가능; 전체 사용자 기반이 동시에 영향을 받음. | [DOCUMENTED] 카나리 배포(Canary releases), 기능 플래그, 점진적 데이터 동기화. |
| **현재 (Modern)** | 섀도 트래픽(shadow traffic) 테스트를 동반한 단계별 마이크로서비스 마이그레이션. | 병목 현상 격리; 지연 시간 급증 시 롤백 용이. | [ANALYTICAL] 부하를 제어하기 위한 API 게이트웨이 계층의 트래픽 셰이핑(Traffic shaping). |

## 자주 묻는 질문 (FAQ)

### 2018년 TSB IT 실패의 원인은 무엇입니까?
이 실패는 Sabadell Proteo4UK 뱅킹 플랫폼의 성급한 배포로 인해 발생했습니다. 이 시스템은 비효율적인 API 쿼리와 액티브-액티브 데이터 센터 구성의 심각한 스레드 경합으로 인해 프로덕션 부하 상태에서 디지털 채널이 멈춰버리는 문제를 겪었습니다.

### IT 장애로 인해 TSB는 얼마의 벌금을 부과받았습니까?
TSB는 총 4,865만 파운드의 벌금을 부과받았습니다. 금융행위감독청(FCA)은 심각한 운영 복원력 장애를 이유로 2,975만 파운드를, 건전성감독청(PRA)은 1,890만 파운드를 부과했습니다.

### TSB IT 시스템 결함은 얼마나 오래 지속되었습니까?
심각한 접속 중단 사태는 2018년 4월 22일에 시작되었습니다. 기본적인 접속 권한은 점진적으로 복구되었지만 광범위한 시스템 불안정, 결제 누락, 심각한 고객 서비스 지연은 수 주 동안 지속되었으며, 완전한 안정화에는 수개월이 걸렸습니다.

### Proteo 시스템 마이그레이션이란 무엇이었습니까?
520만 명의 TSB 고객 계좌를 레거시 Lloyds Banking Group 메인프레임에서 Banco Sabadell이 개발한 최신 맞춤형 코어 뱅킹 플랫폼인 Proteo4UK로 이동하는 8억 파운드 규모의 대규모 프로젝트였습니다.

### TSB IT 붕괴 이후 누가 사임했습니까?
CEO인 Paul Pester가 2018년 9월에 사임했습니다. 중단 사태의 심각성에 대한 부적절한 초기 소통과 그로 인해 촉발된 거센 대중, 언론, 의회의 압박으로 인해 그의 자리는 유지될 수 없었습니다.

### TSB IT 마이그레이션이 실패한 근본적인 이유는 무엇입니까?
마이그레이션이 근본적으로 실패한 이유는 포괄적인 성능 테스트가 부족했기 때문입니다. 개별 소프트웨어 구성 요소는 현실적인 프로덕션 볼륨 하에서 적절하게 테스트되지 않았으며, 520만 명의 사용자가 동시에 로그인을 시도할 때만 드러나는 심각한 아키텍처 병목 현상을 숨기고 있었습니다.

## 아키비스트의 판결

> **아키비스트의 분석:**
> 2018년 TSB 마이그레이션 장애는 통합 기술에 대한 오만함(hubris)이 낳은 극단적인 결과를 보여줍니다. 증거는 명확하게 이 기술적 실패가 손상된 거버넌스 프로세스의 피할 수 없는 결과였음을 증명합니다.
> 
> 통합된 아키텍처가 최고 부하(peak load)를 처리할 수 있는지 입증하지 않은 채 520만 개의 금융 기록에 대해 빅뱅 전환(Big Bang cutover)을 실행하기로 한 결정은 엔지니어링의 책임을 근본적으로 저버린 행위였습니다. Proteo4UK의 아키텍처는 현대적인 분산 시스템으로서 이론적으로는 타당했을지 모르지만, 데이터베이스 스레드 관리와 사이트 간 동기화 지연이라는 치명적인 사각지대를 가진 채 배포되었습니다.
> 
> 규제 기관의 벌금과 CEO의 사임은 단순한 소프트웨어 버그 이상의 구조적인 실패를 반영합니다. 미들웨어 병목 현상을 초기에 진단하지 못한 TSB의 무능력과 마이그레이션을 롤백할 수 없었던 사실은 심오한 아키텍처적 관측 가능성(observability)의 필요성을 강조합니다. 엔터프라이즈 소프트웨어가 레거시 메인프레임을 대체할 때 실패 도메인의 복잡성은 기하급수적으로 커집니다. 테스트도 그에 비례하여 확장되어야만 합니다.

## 공식 1차 출처

- [FCA Final Notice 2022 - TSB Bank plc](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf)
- [Slaughter and May Independent Review of the TSB IT Migration](https://www.tsb.co.uk/news-releases/slaughter-and-may-report/)
- [Treasury Committee Oral Evidence: TSB IT Failure](https://committees.parliament.uk/committee/158/treasury-committee/)
