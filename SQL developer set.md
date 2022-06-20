# ORACLE SQL developer 새로 만들기/ 데이터베이스 접속 선택 화면
*참고 : "테스트(T) "진행 시 아래와 같은 에러 메세지가 나오는 경우에 아래의 순서대로 진행해 보세요. 

> 상태 : 실패 - 테스트 실패: ORA-01017: invalid username/password; logon denied
   

---
## Cmd 창을 이용한 계정 생성 방법
 

1. cmd 창 오픈
   - window + R  -> cmd
2. sql 접속
   - sqlplus 타이핑

3. user-name, password 입력
   - user-name : system
   - password : oracle 설치 시 비밀번호

4. 관리자 권한으로 접속
   - conn/as sysdba

5. 계정 생성
   - create user [id] identified by [pw];

6. 권한 부여
   - grant connect, resource, dba to [id];
   - connect = 접속 권한
   - resource = 객체 및 데이터 조작 권한
   - dba = 모든 권한을 사용자에게 부여할 수 있는 권한

7. 계정 확인
   - select * from all_users;

8. oracle sql developer 접속
   - 초록색 플러스 클릭
   - 위에서 만들었던 계정을 입력
   - 호스트 이름은 localhost , 포트는 기본값 혹은 원하는 포트 번호를 작성
   - 테스트(T) 클릭 -> "상태 : 성공" 임을 확인 하면 완료!!
