import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import RenderHtml, {HTMLContentModel, HTMLElementModel} from 'react-native-render-html';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {calWidth} from '../../assets/CalculateLength';

const customHTMLElementModels = {
  body: HTMLElementModel.fromCustomModel({
    tagName: 'p',
    mixedUAStyles: {
      color: '#000000',
      fontSize: 14,
    },
    contentModel: HTMLContentModel.block,
  }),
};

const Contract1 = {
  html: `<html>
  <head>
  <meta charset="utf-8" />
  <title>Inline Style</title>
  <style type="text/css">
  p {color:#000000; font-size:14px;}
  ol {color:#000000; font-size:14px;}
  li {color:#000000; font-size:14px;}
  </style>
  </head>
  <body>
  <p>제 1 조 (목적)</p>
  
  <p>이 약관은 밥플레이스(이하 &ldquo;회사&rdquo;라 합니다)이 제공하는 서비스와 관련하여, 회사와 이용고객 간에 서비스의 이용조건 및 절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다. 본 약관은 PC통신, 스마트폰(안드로이드폰, 아이폰 등) 앱 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 준용됩니다.</p>
  
  <p>제 2 조 (용어의 정의)</p>
  
  <ol start="1">
    <li>&ldquo;사이트&rdquo;란 &ldquo;업주&rdquo;가 재화 또는 서비스 상품(이하 &ldquo;재화 등&rdquo;이라 합니다)을 &ldquo;이용자&rdquo;에게 판매하기 위하여, &ldquo;회사&rdquo;가 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정하여 제공하는 가상의 영업장을 말합니다.</li>
    <li>&ldquo;회원&rdquo;이라 함은 &ldquo;밥플레이스&rdquo;에 개인정보를 제공하여 회원등록을 한 자로서, &ldquo;밥플레이스&rdquo;가 제공하는 서비스를 계속적으로 이용할 수 있는자를 의미하고, &ldquo;밥플레이스&rdquo;는 광고업소는 포함되지 않습니다.</li>
    <li>&ldquo;비회원&rdquo;이라 함은 &ldquo;회원&rdquo;이 아닌사람을 의미하며, &ldquo;회사&rdquo;가 제공하는 서비스를 이용할 수 없습니다.</li>
    <li>&ldquo;이용자&rdquo;라 함은 밥플레이스 서비스를 이용하는 자를 말하는 것이며, 회원만을 포함합니다.</li>
    <li>&ldquo;비밀번호(Password)&rdquo;라 함은 회원의 동일성 확인과 회원의 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 사이트에 등록한 영문과 숫자 등의 조합을 말합니다.</li>
    <li>&ldquo;게시물&rdquo;이라 함은 &ldquo;회원&rdquo;이 서비스를 이용함에 있어 서비스 상에 게시한 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
    <li>&ldquo;업주&rdquo;란 &ldquo;회사&rdquo;가 제공하는 &ldquo;서비스&rdquo;를 이용해 &ldquo;재화 등&rdquo;에 관한 정보를 게재하고, 판매(조리)하는 주체를 말합니다.</li>
  </ol>
  
  <p>제 3 조 (약관의 명시와 개정)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 이 약관의 내용과 상호, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 대표자의 성명, 사업자등록번호, 통신판매업 신고번호, 연락처(전화, 전자우편 주소 등) 등을 &ldquo;이용자&rdquo;가 쉽게 알 수 있도록 &ldquo;사이트&rdquo;의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 &ldquo;이용자&rdquo;가 연결화면을 통하여 보도록할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 『전자상거래 등에서의 소비자보호에 관한 법률』, 『전자문서 및 전자거래기본법』, 『전자서명법』, 『정보통신망 이용촉진 등에 관한 법률』, 『소비자기본법』 등 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 &ldquo;사이트&rdquo;의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, &ldquo;이용자&rdquo;에게 불리하게 약관내용ㅇ을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 &ldquo;회사&rdquo;는 개정 전과 개정 후 내용을 &ldquo;이용자&rdquo;가 알기 쉽도록 표시합니다.</li>
    <li>&ldquo;회원&rdquo;은 변경된 약관에 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우에는 서비스 이용을 중단하고 탈퇴할 수 있습니다. 다만, &ldquo;이용자&rdquo;가 제3항의 방법 등으로 &ldquo;회사&rdquo;가 별도 고지한 약관 개정 공지 기간 내에 &ldquo;회사&rdquo;에 개정 약관에 동의하지 않는다는 명시적인 의사표시를 하지 않는 경우 변경된 약관에 동의한 것으로 간주합니다.</li>
    <li>이 약관에서 정하지 아니한 사항과 이 약관에 해석에 관여는 『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의 규제 등에 관한 법률』, 공정거래위원회가 정하는 『전자상거래 등에서의 소비자보호지침』 및 관계 법령 또는 상관례에 따릅니다.</li>
  </ol>
  
  <p>제 4 조 (관련법령과의 관계)</p>
  
  <p>이 약관 또는 개별약관에서 정하지 않은 사항은 전기통신사업법, 전자거래기본법, 정보통신망법, 전자상거래 등에서의 소비자보호에 관한 법률, 개인정보보호법 등 관련 법령의 규정과 일반적인 상관례에 의합니다.<br />
  제 5 조 (서비스의 제공 및 변경)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 다음과 같은 서비스를 제공합니다.<br />
    1) &ldquo;재화 등&rdquo;에 대한 광고플랫폼 서비스</li>
  </ol>
  
  <p>2) &ldquo;재화 등&rdquo;에 대한 주문중개 및 판매중개 등 통신판매중개 서비스</p>
  
  <p>3) 위치기반 서비스</p>
  
  <p>4) 기타 &ldquo;회사&rdquo;가 정하는 서비스</p>
  
  <ol start="2">
    <li>&ldquo;회사&rdquo;는 서비스 제공과 관련한 회사 정책의 변경 등 기타 상당한 이유가 있는 경우 등 운영상, 기술상의 필요에 따라 제공하고 있는 &ldquo;서비스&rdquo;의 전부 또는 일부를 변경 또는 중단할 수 있습니다.</li>
    <li>&ldquo;서비스&rdquo;의 내용, 이용방법, 이용시간에 대한 변경 또는 &ldquo;서비스&rdquo; 중단이 있는 경우에는 변경 또는 중단될 &ldquo;서비스&rdquo;의 내용 및 사유와 일자 등은 그 변경 또는 중단 전에 &ldquo;서비스&rdquo; 내 &ldquo;팝업&rdquo;, &ldquo;알림&rdquo; 화면 등 &ldquo;회원&rdquo;이 충분한 인지할 수 있는 방법으로 사전에 공지합니다. 다만, 회원 본인의 거래와 관련하여 서비스의 중단 등 중대한 영향을 미치는 사항에 대하여는 제15조 제1항에서 규정한 방법으로 개별통지를 합니다.</li>
  </ol>
  
  <p>제 6 조 (서비스 이용시간 및 중단)</p>
  
  <ol start="1">
    <li>&ldquo;서비스&rdquo;의 이용은 &ldquo;회사&rdquo;의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24간을 원칙으로 합니다. 다만, 정기 점검등의 필요로 &ldquo;회사&rdquo;가 정한 날이나 시간은 제외됩니다. 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;서비스&rdquo;의 원활한 수행을 위하여 필요한 기간을 정하여 사전에 공지하고 서비스를 중지할 수 있습니다. 단, 불가피하게 긴급한 조치를 필요로하는 경우 사후에 통지할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 컴퓨터 등 정보통신설비의 보수점검,교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 &ldquo;서비스&rdquo;의 제공을 일시적으로 중단할 수 있습니다.</li>
  </ol>
  
  <p>제 7 조 (이용계약의 성립)</p>
  
  <ol start="1">
    <li>이용계약은 &ldquo;회원&rdquo;되고자 하는 자 (이하 &ldquo;가입신청자&rdquo;)가 약관의 내용에 동의를 하고, &ldquo;회사&rdquo;가 정한 가입양식에 따라 회원정보를 기입하여 회원가입신청을 하고 &ldquo;회사&rdquo;가 이러한 신청에 대하여 승인함으로써 체결됩니다.</li>
    <li>&ldquo;회사&rdquo;는 다음 각 호에 해당하는 신청에 대하여는 승인을 하지 않을 수 있습니다.<br />
    1) 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우. 다만, 회원자격 상실 후 3년이 경과한 자로서 회사의 회원재가입 승낙을 얻은 경우에는 예외로 함</li>
  </ol>
  
  <p>2) 실명이 아니거나 타인의 명의를 이용한 경우</p>
  
  <p>3) 회사가 실명확인절차를 실시할 경우에 이용자의 실명가입 신청이 사실 아님이 확인된 경우</p>
  
  <p>4) 등록내용에 허위의 정보를 기재하거나, 기재누락, 오기가 있는 경우</p>
  
  <p>5) 이미 가입된 회원과 전화번호나 전자우편주소가 동일한 경우</p>
  
  <p>6) 부정한 용도 또는 영리를 추구할 목적으로 본 서비스를 이용하고자하는 경우</p>
  
  <p>7) 만 14세 미만 아동이 법정대리인의 동의 없이 가입한 것으로 확인된 경우</p>
  
  <p>8) 기타 이 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된 경우 및 이에 준하는 사유가 발생한 경우</p>
  
  <ol start="3">
    <li>제1항에 따른 신청에 있어 &ldquo;회사&rdquo;는 &ldquo;회원&rdquo;에게 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
    <li>&ldquo;회원&rdquo;은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 &ldquo;회사&rdquo;에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.</li>
  </ol>
  
  <p>제 8 조 (이용계약의 종료)</p>
  
  <ol start="1">
    <li>&ldquo;회원&rdquo;의 해지<br />
    1) &ldquo;회원&rdquo;은 언제든지 &ldquo;회사&rdquo;에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다.<br />
    2) &ldquo;회사&rdquo;는 제 1호에 따른 &ldquo;회원&rdquo;의 해지요청에 대해 특별한 사정이 없는 한 이를 즉시 처리합니다.</li>
  </ol>
  
  <p>3) &ldquo;회원&rdquo;이 계약을 해지하는 경우 &ldquo;회원&rdquo;이 작성한 게시물은 삭제되지 않습니다</p>
  
  <ol start="2">
    <li>&ldquo;회사&rdquo;의 해지</li>
  </ol>
  
  <p>1) &ldquo;회사&rdquo;는 다음과 같은 사유가 있는 경우 이용계약을 해지할 수 있습니다.</p>
  
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가. 제7조 제2항에서 정하고 있는 이용계약의 승낙거부사유가 있음이 확인된 경우</p>
  
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;나. &ldquo;회원&rdquo;이 &ldquo;회사&rdquo;나 다른 회원 기타 타인의 권리나 명예, 신용 기타 정당한 이익을 침해하는 행위를 하였다고 합리적으로 판단되는 경우</p>
  
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다. 1년 이상 서비스를 이용한 이력이 없는 경우</p>
  
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;라. 기타 &ldquo;회원&rdquo;이 이 약관에 위배되는 행위를 하거나 이 약관에서 정한 해지사유가 발생한 경우</p>
  
  <p>2) &ldquo;회사&rdquo;는 제8조 제2항 제1호 가, 다, 라 목의 사유가 발생한 경우 &ldquo;회원&rdquo;에게 사전 통보 후 계약을 해지할 수 있으며,나 목의 사유가 발생한 경우에는 사전통보 없이 계약을 해지할 수 있습니다. 계약해지에 관한 통지를 하는 경우 제15조 제1항에서 정한 통지 방법으로 합니다.</p>
  
  <p>3) 해지를 통지받은 &ldquo;회원&rdquo;은 해지에 이의를 제기하고자 하는 경우 &ldquo;회사&rdquo;의 고객센터에 문의할 수 있습니다.</p>
  
  <p>제 9 조 (회원의 ID 및 비밀번호에 대한 의무)</p>
  
  <ol start="1">
    <li>ID와 비밀번호에 관한 관리책임은 &rdquo;회원&rdquo;에게 있습니다.</li>
    <li>&ldquo;회원&ldquo;은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</li>
    <li>&ldquo;회원&rdquo;이 자신의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 즉시 &ldquo;회사&rdquo;에 통보하고 &ldquo;회사&rdquo;의 조치가 있는 경우에는 그에 따라야 합니다.</li>
    <li>&ldquo;회원&rdquo;이 제3항에 따른 통지를 하지 않거나 &ldquo;회사&rdquo;의 조치에 응하지 아니하여 발생하는 모든 불이익에 대한 책임은 &ldquo;회원&rdquo;에게 있습니다.</li>
  </ol>
  
  <p>제 10 조 (회원 및 이용자의 의무)</p>
  
  <ol start="1">
    <li>&ldquo;이용자&rdquo;는 관계법령 및 이 약관의 규정을 준수하여야 하며, 기타 &ldquo;회사&rdquo; 업무에 방해되는 행위를 하여서는 안됩니다.</li>
    <li>&ldquo;이용자&rdquo;는 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다. 이 때, 각 호의 행위에 관한 구체적인 내용에 대해서는 &ldquo;회사&rdquo;의 정책, 이용안내 등에 따릅니다.</li>
  </ol>
  
  <ol start="1">
    <li>서비스 신청 또는 변경 시 허위내용의 등록</li>
    <li>&ldquo;회사&rdquo;에 게시된 정보의 허가 받지 않은 변경</li>
    <li>&ldquo;회사&rdquo;가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
    <li>&ldquo;회사&rdquo; 또는 제3자의 저작권 등 지적 재산권에 대한 침해</li>
    <li>&ldquo;회사&rdquo; 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
    <li>외설 또는 폭력적인 메시지, 화상, 음성 기타 공공질서 미풍양속에 반하는 정보를 &ldquo;서비스&rdquo;에 공개 또는 게시하는 행위</li>
    <li>고객센터 상담 내용이 욕설, 폭언, 성희롱 등에 해당하는 행위</li>
    <li>포인트를 부정하게 적립하거나 사용하는 등의 행위</li>
    <li>허위 (미션)성공요청, 허위 리뷰작성 등을 통해 서비스를 부정한 목적으로 이용하는 행위</li>
    <li>&nbsp;자신의 ID, PW를 제3자에게 양도하거나 대여하는 등의 행위</li>
    <li>&nbsp;정당한 사유 없이 당사의 영업을 방해하는 내용을 기재하는 행위</li>
    <li>&nbsp;리버스엔지니어링, 디컴파일, 디스어셈블 미 기타 일체의 가공행위를 통하여 서비스를 복제, 분해, 또는 모방 기타 변형하는 행위</li>
    <li>&nbsp;자동 접속 프로그램등을 사용하는 등 정상적인 용법과 다른 방법으로 서비스를 이용하여 &ldquo;회사&rdquo;의 서버에 부하를 일으켜 회사의 정상적인 서비스를 방해하는 행위</li>
    <li>&nbsp;정당한 사유 없이 성공요청을 반복하여 &ldquo;회사&rdquo;의 서비스 또는 &ldquo;업주&rdquo;의 영업을 방해하는 행위</li>
    <li>&nbsp;미션 성공을 요청하는 과정에서 정당한 사유 없이 &ldquo;재화 등&rdquo;에 대한 대금을 미지급하는 행위</li>
    <li>&nbsp;기타 관계 법령에 위반된다고 판단되는 행위</li>
  </ol>
  
  <p>3. &ldquo;회사&rdquo;는 이용자가 본 조 제2항의 금지행위를 한 경우 본 약관 제13조에 따라 서비스 이용 제한 조치를 취할 수 있습니다.</p>
  
  <p>&nbsp;</p>
  
  <p>&nbsp;</p>
  
  <p>제 11 조 (회원의 게시물)</p>
  
  <ol start="1">
    <li>&ldquo;회원&rdquo;이 작성한 게시물에 대한 저작권은 회원에게 있으며, 해당 게시물의 저작권 침해를 비롯한 민,형사상 모든 책임은 &ldquo;회원&rdquo;에게 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 게시하거나 등록하는 게시물의 내용이 다음 각 호에 해당한다고 판단되는 경우 해당 게시물을 사전 통지 없이 삭제, 차단, 임시조치(블라인드)할 수 있고, 조치 후 &ldquo;회사&rdquo;는 &ldquo;회원&rdquo;에게 지체 없이 그 사유를 통지합니다. 이러한 조치들에 대해 &ldquo;회원&rdquo;은 밥플레이스 고객센터를 통해 이의를 제기할 수 있습니다.</li>
  </ol>
  
  <ol start="1">
    <li>특정인의 개인정보를 노출한 경우</li>
    <li>사람을 비방한 목적으로 공공연하게 사실이나 거짓의 사실을 드러내어 타인의 명예를 훼손하거나 타인의 사생활을 침해하는 내용인 경우</li>
    <li>공공질서 및 미풍양속에 위반되는 내용일 경우</li>
    <li>범죄를 목적으로 하거나 교사 또는 방조하는 내용인 경우</li>
    <li>&ldquo;회사&rdquo; 또는 제3자의 저작권, 상표권 등 지식재산권을 침해하는 내용인 경우</li>
    <li>&ldquo;회원&rdquo;이 음란한 부호, 문언, 음향, 화상 또는 영상을 게시하거나 이와 관련된 사이트를 링크하는 경우</li>
    <li>공포심 또는 불안감을 유발하는 부호, 문언, 음향, 화상 또는 영상을 반복적으로 상대방에게 도달하도록 하는 내용인 경우</li>
    <li>정당한 사유 없이 정보통신시스템, 데이터 또는 프로그램등을 훼손, 멸실, 변경, 위조하거나 그 운용을 방해하는 내용인 경우</li>
    <li>법령에 따라 금지되는 사행행위에 해당하는 내용인 경우</li>
    <li>&nbsp;회사로부터 사전 승인 받지 아니한 상업광고, 판촉 내용을 게시하는 경우</li>
    <li>&nbsp;게시판이 목적에 부합하지 않거나 &ldquo;회사&rdquo; 또는 &ldquo;업주&rdquo;가 제공하는 서비스 및 상품과 관련 없는 내용인 경우</li>
    <li>&nbsp;정당한 사유 없이 &ldquo;회사&rdquo; 또는 &ldquo;업주&rdquo;의 영업을 방해하는 내용을 기재하는 경우</li>
    <li>&nbsp;특정 업주의 판매상품 또는 특정 업소에 대하여 우호적인 내용의 게시물을 다수 반복적으로 게시하였고, 이러한 게시물의 내용 및 게시 횟수, 게시 시점 등을 종합적으로 고려할때 특정 업주와의 경제적 이해관계가 있다는 점이 합리적으로 의심되는 경우</li>
    <li>&nbsp;허위 성공요청 등 위법 부당한 방법으로 리뷰 권한을 획득하여 &ldquo;회원&rdquo; 또는 제3자의 계정을 이용하여 게시글을 게시하는 경우</li>
    <li>&nbsp;관계법령, 약관, 운영정책 등 위반행위를 할 우려가 있거나 위반행위를 한 경우</li>
    <li>&nbsp;기타 위 각 호의 사유에 준하는 사유가 발생한 경우</li>
  </ol>
  
  <p>제 12 조 (회원게시물의 관리)</p>
  
  <ol start="1">
    <li>&ldquo;회원&rdquo;의 &ldquo;게시물&rdquo;이 정보통신망법 및 저작권법 등 관련법령에 위반되는 내용을 포함하는 경우, 이로 인하여 권리를 침해받은 자(이하 &ldquo;귄리침해 주장자&rdquo;라 합니다)는 관련법령이 정한 방법과 절차에 따라 권리침해사실을 소명하여 해당 &ldquo;게시물&rdquo;의 삭제 또는 게시중단 등을 요청할 수 있습니다.</li>
    <li>회사는 제1항에 따른 요청을 받으면 관련법령에 따라 지체없이 삭제 또는 게시중단 등 필요한 조치를 하고 &ldquo;권리침해 주장자&rdquo;와 해당 &ldquo;게시물&rdquo; 작성자에게 알려야 합니다.</li>
    <li>&ldquo;게시물&rdquo; 작성자로부터 제2항의 게시중단에 대한 이의신청이 접수되면 회사는 게시중단 조치를 해지(게시물을 복원)할 수 있으며, 이러한 이의신청 없이 게시중단 기간이 경과한 경우에는 회사는 해당 &ldquo;게시물&rdquo;을 영구적으로 차단할 수 있습니다.</li>
    <li>회사는 제1항에 따른 &ldquo;권리침해 주장자&rdquo;의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법령에 위반되는 경우에는 관련법령에 따라 해당 &ldquo;게시물&rdquo;을 삭제 또는 게시중단 할 수 있습니다.</li>
    <li>본 조에 따른 세부절차는 정보통신망법 및 저작권법 등 관련법령이 규정한 범위 내에서 회사가 정한 밥플레이스 리뷰 운영정책에 따릅니다.</li>
  </ol>
  
  <ul>
    <li>게시중단요청 :&nbsp;bobpossible0@naver.com</li>
  </ul>
  
  <p>제 13 조 (이용제한 등)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 &ldquo;이용자&rdquo;가 이 약관의 의무를 위반하거나 &ldquo;서비스&rdquo;의 정상적인 운영을 방해한 경우, 주의, 경고, 일시정지, 영구이용정지, 계약해지등의 (삭제)조치를 즉시 취할 수 있으며, &ldquo;이용자&rdquo;는 법적책임을 부담합니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;주민등록법&rdquo;을 위반한 명의도용 및 결제도용, 전화번호 도용, &ldquo;저작권법&rdquo;(삭제)을 위반한 불법프로그램의 제공 및 운영방해, &ldquo;정보통신망 이용촉진 및 정보보호 등에 관한 법률&rdquo;을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위, &ldquo;여신전문금융업법&rdquo;을 위반한 &ldquo;이용자&rdquo;의 신용카드 부정거래 등 이와 유사한 형태의 부정행위 등과 같이 관련법을 위반한 경우에는 주의, 경고, 일시정지, 영구이용정지, 계약해지 등의 조치를 즉시취할 수 있으며, &ldquo;이용자&rdquo;는 법적책임을 부담할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 계속해서 1년 이상 로그인하지 않는 경우, 회원정보의 보호및 운영의 효율성을 위해 이용을 제한할 수 있습니다.</li>
    <li>본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 회사의 이용제한정책에서 정하는 바에 의합니다.</li>
    <li>본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는 회사는 제15조[회원에 대한 통지]에 따라 통지합니다.</li>
    <li>&ldquo;회원&rdquo;은 본 조에따른 이용제한 등에 대해 &ldquo;회사&rdquo;가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 &ldquo;회사&rdquo;는 즉시 서비스의 이용을 재개합니다.</li>
    <li>본 조에 따라 이용제한이 되는 경우 서비스 이용을 통해 획득한 혜택 등도 모두 이용중단, 또는 소멸되며, &ldquo;회사&rdquo;는 이에 대해 별도로 보상하지 않습니다.</li>
  </ol>
  
  <p>제 14 조 (권리의 귀속)</p>
  
  <ol start="1">
    <li>&ldquo;서비스&rdquo;에 대한 저작권 및 지적재산권은 &ldquo;회사&rdquo;에 귀속됩니다. 단, &ldquo;회원&rdquo;의 &ldquo;게시물&rdquo; 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.</li>
    <li>&ldquo;회사&rdquo;가 제공하는 &ldquo;서비스&rdquo;의 디자인, &ldquo;회사&rdquo;가 만든 텍스트, 스크립트(script), 그래픽, &ldquo;회원&rdquo; 상호간 전송 기능 등 &ldquo;회사&rdquo;가 제공하는 &ldquo;서비스&rdquo;에 관련된 모든 상표, 서비스 마크, 로고 등에 관한 저작권 기타 지적재산권은 대한민국 및 외국의 법령에 기하여 &ldquo;회사&rdquo;가 보유하고 있거나 &ldquo;회사&rdquo;에게 소유권 또는 사용권이 있습니다.</li>
    <li>&ldquo;회원&rdquo;은 이 이용약관으로 인하여 서비스를 소유하거나 &ldquo;서비스&rdquo;에 관한 저작권을 보유하게 되는 것이 아니라, &ldquo;회사&rdquo;로부터 서비스의 이용을 허락받게 되는바, 정보취득 또는 개인용도로만 &ldquo;서비스&rdquo;를 이용할 수 있습니다.</li>
    <li>&ldquo;회원&rdquo;은 명시적으로 허락된내용을 제외하고는 &ldquo;서비스&rdquo;를 통해 얻어지는 정보를 영리 목적으로 사용, 복사, 유통 하는 것을 포함하여, &ldquo;회사&rdquo;가 만든 텍스트, 스크립트, 그래픽의 &ldquo;회원&rdquo; 상호간 전송기능 등을 복사하거나 유통할 수 없습니다.</li>
    <li>&ldquo;회사&rdquo;는 서비스와 관련하여 &ldquo;회원&rdquo;에게 &ldquo;회사&rdquo;가 정한 이용조건에 따라 계정, ID, 콘첸츠 등을 이용할 수 있는 이용권만을 부여하며, 이용자는 회사를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 등 기타방법에 의하여 영리목적으로 이용하거나 제3자에게 이용, 양도, 판매, 담보목적으로 제공하여서는 안됩니다.</li>
  </ol>
  
  <p>제 15 조 (회원에 대한 통지)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;가 &ldquo;회원&rdquo;에 대한 통지를 하는 경우, &ldquo;회원&rdquo;이 가입신청 시 &ldquo;회사&rdquo;에 제출한 전자우편 주소나 휴대전화번호 등으로 할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 불특정다수 &ldquo;회원&rdquo;에 대한 통지의 경우, 1주일 이상 사이트에 게시함으로써 개별통지에 갈음할 수 있습니다. 다만 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 제1항에서 규정한 방법으로 개별 통지를 합니다.</li>
  </ol>
  
  <p>제 16 조 (회사의 의무)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 &ldquo;서비스&rdquo;를 제공하기 위하여 최선을 다하여 노력합니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 안전하게 &ldquo;서비스&rdquo;를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 개인정보처리방침을 수립하여 공시하고 준수합니다.</li>
    <li>회사는 관계 법령이 정한 의무사항을 준수합니다.</li>
  </ol>
  
  <p>제 17 조 (개별 서비스에 대한 약관 및 이용조건)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 개별 서비스와 관련한 별도의 약관 및 이용정책을 둘 수 있으며, 개별서비스에서 별도로 적용되는 약관에 대한 동의는 &ldquo;회원&rdquo;이 개별서비스를 최초로 이용할 경우 별도의 동의절차를 거치게 됩니다. 이 경우 개별 서비스에 대한 이용약관등이 본 약관에 우선합니다.</li>
    <li>전항에도 불구하고 &ldquo;회사&rdquo;는 개별 서비스에 대한 이용정책에 대해서는 &ldquo;서비스&rdquo;를 통해 공지할 수 있으며, &ldquo;이용자&rdquo;는 이용정책을 숙지하고 준수하여야 합니다.</li>
  </ol>
  
  <p>제 18 조 (포인트)</p>
  
  <ol start="1">
    <li>포인트는 &ldquo;서비스&rdquo;를 통해 &ldquo;재화 등&rdquo;을 사용할 시에 얻게되는 것이며, &ldquo;회사&rdquo;가 정한 일정액 이상의 포인트를 보유한 &ldquo;회원&rdquo;은 &ldquo;회사&rdquo;가 정한 절차에 따라 보유하고 있는 가용 &ldquo;적립금&rdquo;을 현금으로 환산한 금액을 지급받을 수 있습니다.</li>
    <li>현금 전환이 가능한 &ldquo;포인트&rdquo;의 최소액은 &ldquo;회사&rdquo;의 정책에 의하여 결정되며 &ldquo;서비스&rdquo;내에서 확인할 수 있습니다.</li>
    <li>현금 전환 비율은 일 포인트(1 point)당 일 원(1&nbsp;₩)을 원칙으로 합니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 현금 전환 신청한 &ldquo;포인트&rdquo;를 지정한 은행계좌에 송금함으로써 적법하게 지급을 완료한 것으로 봅니다.</li>
    <li>현금 전환시 발생하는 금융기관 수수료, 제세공과금은 &ldquo;회사&rdquo;의 부담으로 합니다.</li>
    <li>포인트는 &ldquo;회원&rdquo;의 미션활동, 이벤트 참여 등에 따라 &ldquo;회사&rdquo;가 적립, 부여하는 포인트만을 의미합니다.</li>
    <li>무료포인트의 유효기간은 적립일로부터 1년이며, 1년이 경과하는 날까지 이용하지 않은 경우 상법상 소멸시효에 따라 소멸됩니다. 단, &ldquo;회사&rdquo;는 무료 포인트의 유효기간을 변경할 수 있으며 이 경우 발급 시점에 &ldquo;회원&rdquo;에게 고지합니다.</li>
    <li>&ldquo;회사&rdquo;가 무상으로 적립 또는 부여하는 무료포인트는 현금 환급 신청이 가능합니다.</li>
    <li>&ldquo;회원&rdquo; 탈퇴 시 미 사용한 무료포인트는 소멸되며, &ldquo;회사&rdquo;는 소멸되는 무료포인트에 대해서 별도의 보상을 하지 않습니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 포인트를 적립, 사용, 환급하는 경우 휴대폰 인증 등 &ldquo;회사&rdquo;가 정한 인증절차를 거치도록 할 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 포인트 적립기준, 사용조건 및 제한 등에 관한 사항을 서비스 화면에 별도로 게시하거나 통지합니다.</li>
  </ol>
  
  <p>제 19 조 (개인정보보호)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;의 개인정보를 보호하기 위하여 정보통신망법 및 개인정보 보호법 등 관계 법령에서 정하는 바를 준수합니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;의 개인정보를 보호하기 위한 개인정보처리방침을 수립하여 서비스 초기화면에 게시합니다. 다만, 개인정보처리방침의 구체적 내용은 연결화면을 통하여 볼 수 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 관련법령 및 개인정보처리방침에 따라 &ldquo;회원&rdquo;의 개인정보를 최대한보호하기 위해서 노력합니다.</li>
    <li>&ldquo;회사&rdquo;의 공식 사이트 이외의 링크된 사이트에서는 &ldquo;회사&rdquo;의 개인정보처리방침이 적용되지 않습니다. 링크된 사이트 및 구매 상품이나 서비스를 제공하는 제3자의 개인정보 취급과 관련하여는 해당 사이트 및 해달 제3자의 개인정보처리방침을 확인할 책임이 &ldquo;회원&rdquo;에게 있으며, &ldquo;회사&rdquo;는 이에 대하여 책임을 부담하지 않습니다.</li>
  </ol>
  
  <p>제 20 조(책임제한)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 다음의 사항에 대해서는 책임을 지지 않습니다.<br />
    단, &ldquo;회사&rdquo; 및 &ldquo;회사&rdquo;의 임직원, 대리인의 고의 또는중대한 과실이 인정되는 경우에는 그러하지 아니합니다.</li>
  </ol>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 &ldquo;업주&rdquo;와 &ldquo;회원&rdquo;간의 상품거래를 중개하는 플랫폼 서비스만을 제공할 뿐, &ldquo;재화 등&rdquo;을 판매하는 당사자가 아니며, &ldquo;재화 등&rdquo;에 대한 정보 및 하자 등에 대한 책임은 &ldquo;업주&rdquo;에게 있습니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;업주&rdquo;가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관해서는 책임을 지지 않습니다.</li>
    <li>&ldquo;회사&rdquo;는 천재지변 또는 이에 준하는 불가항력으로 인하여 &ldquo;서비스&rdquo;를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo; 및 &ldquo;업주&rdquo; 가 게재한 이용후기, 맛집 평가, 사진 등 정보/자료/사실의 신뢰도, 정확성에 대해서는 책임을 지지 않습니다.</li>
    <li>&ldquo;회사&rdquo;는 제3자가 서비스 내 화면 또는 링크된 웹사이트를 통하여 광고한 제품 또는 서비스의 내용과 품질에 대하여 감시할 의무 기타 어떠한 책임도 지지 아니합니다.</li>
    <li>&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
    <li>&ldquo;회사&rdquo; 및 &ldquo;회원&rdquo;간 또는 &ldquo;회원&rdquo;과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.</li>
  </ol>
  
  <p>&nbsp;</p>
  
  <ol start="2">
    <li>&ldquo;회사&rdquo; 및 &ldquo;회사&rdquo;의 임직원 그리고 대리인은 고의 또는 과실이 없는 한 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다.</li>
  </ol>
  
  <ol start="1">
    <li>회원 정보의 허위 또는 부정확성에 기인하는 손해</li>
    <li>서비스에 대한 접속 및 서비스의 이용과정에서 &ldquo;회원&rdquo;의 귀책사유로 발생하는 손해</li>
    <li>서버에 대한 제3자의 불법적인 행위를 방지하거나 예방하는 과정에서 발생하는 손해</li>
    <li>제3자가 서비스를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유표되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해</li>
    <li>&ldquo;회원&rdquo;의 귀책사유로 인한 &ldquo;서비스&rdquo;이용의 장애로 발생하는 손해</li>
  </ol>
  
  <p>제 21 조 (분쟁해결)</p>
  
  <ol start="1">
    <li>&ldquo;회사&rdquo;는 이용자가 제기하는 정당한 의견이나 불만을 반영하기 위하여 고객상담을 설치, 운영합니다.</li>
    <li>&ldquo;회사&rdquo;는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.</li>
    <li>&ldquo;회사&rdquo;와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래 위원회 또는 시, 도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
  </ol>
  
  <p>제 22 조 (준거법 및 관할법원)</p>
  
  <ol start="1">
    <li>이 약관의 해석 및 회사와 회원간의 분쟁에 대하여는 대한민국의 법을 적용합니다.</li>
    <li>서비스 이용 중 발생한 회원간의 소송은 민사소송 법에 의한 관할법원에 제소합니다.</li>
  </ol>
  
  </body>
  
  </html>
  `,
};
const Contract2 = {
  html: `<html>

  <head>
  
  <meta charset="utf-8" />
  
  <title>Inline Style</title>
  <style type="text/css">
  
  p {color:#000000; font-size:14px;}
  ol {color:#000000; font-size:14px;}
  li {color:#000000; font-size:14px;}
  </style>
  </head>
  
  <body>
  
  <p>밥플레이스는 원활한 서비스 제공을 위해 최소한의 범위내에서 아래와 같이 개인정보 수집, 이용합니다.</p>
  
  <ol start="1">
    <li>수집 항목</li>
  </ol>
  
  <table>
    <tbody>
      <tr>
        <td colspan="1" rowspan="1">
        <p>구분</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>수집항목</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
        <p>타사 계정을 이용한 회원가입</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>타사계정을 이용한 회원가입 : 닉네임, 이메일주소, 휴대전화번호, 프로필이미지</p>
  
        <p>*제3자로부터 제공받는 개인정보</p>
  
        <ul>
          <li>카카오톡 : 이메일주소, 카카오 ID코드</li>
        </ul>
  
        <ul>
          <li>구글 : 이메일주소, 구글 ID코드</li>
        </ul>
  
        <ul>
          <li>Apple ID : 이메일주소, Apple ID코드</li>
        </ul>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
        <p>본인 인증 시 (본인 또는 법정 대리인) - 없</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>이름, 휴대전화번호, CI, DI, 생년월일, 성별 내/외국인 여부</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
        <p>서비스 이용 시</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>휴대전화번호, 주소</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
        <p>자동 수집 정보</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>IP주소, 쿠키, 방문기록, 서비스 이용기록, 기기정보(기기고유번호, OS버전, 모델명, 제조사 정보 등), 광고 ID, 통신기록 등</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
        <p>계좌환급 시</p>
        </td>
        <td colspan="1" rowspan="1">
        <p>은행계좌정보</p>
        </td>
      </tr>
    </tbody>
  </table>
  
  <p>&nbsp;</p>
  
  <p>미션 밥파서블이 제공하는 서비스 이용 시 또는 이벤트 응모 및 제휴서비스 신청 과정에서 개인정보 수집이 발생할 수 있습니다.<br />
  개인정보를 수집하는 경우에는 필요 시점에 동의를 거쳐 개인정보 수집 이용합니다.</p>
  
  <ol start="2">
    <li>수집 이용 목적</li>
  </ol>
  
  <ul>
    <li>회원가입 의사 확인, 동의 의사 확인(본인), 회원제 서비스 제공, 회원 관리</li>
    <li>이용자 식별, 본인인증, 성인인증</li>
    <li>서비스 제공 및 관리, 서비스 개선, 신규 서비스 개발</li>
    <li>민원처리 및 고객상담</li>
    <li>고지사항 전달</li>
    <li>불법 및 부정 이용방지, 부정 사용자 차단 및 관리</li>
    <li>서비스 방문 및 이용기록 통계 및 분석</li>
    <li>서비스 만족도 조사 및 관리</li>
    <li>맞춤서비스, 개인화 서비스 제공</li>
    <li>이벤트 정보 및 참여기회 제공</li>
    <li>광고성 정보 제공 등 마케팅 및 프로모션</li>
    <li>포인트의 현금전환 기능 제공</li>
  </ul>
  
  <ol start="3">
    <li>보유 및 이용기간</li>
  </ol>
  
  <ul>
    <li>회원 탈퇴 후 지체없이 파기&nbsp;(단, 관련법령에 따라 보관되는 정보는 예외)</li>
    <li>단, 회원가입 남용(부정거래), 서비스 부정 사용(허위리뷰, 이벤트 부정 혜택 등) 확인 및 방지를 위해 휴대전화번호, 이메일주소, 기기정보, CI/DI는&nbsp;회원탈퇴 3년 후 파기합니다.</li>
  </ul>
  
  <p>&nbsp;</p>
  
  <p>위 개인정보 수집/이용에 동의하지 않으실 수 있으며, 동의하지 않는 경우 회원가입 및 서비스 이용이 제한됩니다.</p>
  
  <p>그 밖의 사항은 밥플레이스 개인정보처리방침에 따릅니다.</p>
  
  <p>&nbsp;</p>
  
  <p>&nbsp;</p>
  
  
  </body>
  </html>
  `,
};
const Contract3 = {
  html: `<html>

  <head>
  
  <meta charset="utf-8" />
  
  <title>Inline Style</title>
  <style type="text/css">
  
  p {color:#000000; font-size:14px;}
  ol {color:#000000; font-size:14px;}
  li {color:#000000; font-size:14px;}
  </style>
  </head>
  
  <body>
  
  <p>제1조 (목적)</p>
  
  <p>본 약관은 회원(본 약관에 동의한 자를 말합니다. 이하 &ldquo;회원&rdquo;이라고 합니다)이 밥플레이스(이하 &ldquo;회사&rdquo;라고 합니다)이 제공하는 위치기반서비스(이하 &ldquo;서비스&rdquo;라고 합니다)를 이용함에 있어 회사와 회원의 권리・의무 및 책임사항을 규정함을 목적으로 합니다.</p>
  
  <p>제2조 (약관의 효력 및 변경)</p>
  
  <p>본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본 약관에 동의하고 회사가 정한 소정의 절차에 따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.</p>
  
  <p>회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 기타의 방법으로 공지합니다.</p>
  
  <p>회사는 필요하다고 인정되면 본 약관을 변경할 수 있으며, 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 그 적용일자 7일 전부터 적용일 이후 상당한 기간 동안 공지합니다. 다만, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터 적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 게시하여 고지합니다.</p>
  
  <p>회사가 전항에 따라 회원에게 공지하거나 통지하면서 공지 또는 통지ㆍ고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 불구하고 거부의 의사표시가 없는 경우에는 변경된 약관에 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 이용계약을 해지할 수 있습니다.</p>
  
  <p>제3조 (약관 외 준칙)</p>
  
  <p>본 약관에 규정되지 않은 사항에 대해서는 위치정보의 보호 및 이용 등에 관한 법률(이하 &ldquo;위치정보법&rdquo;이라고 합니다), 전기통신사업법, 정보통신망 이용촉진 및 보호 등에 관한 법률(이하 &ldquo;정보통신망법&rdquo;이라고 합니다), 개인정보보호법 등 관련법령 또는 회사가 정한 서비스의 운영정책 및 규칙 등(이하 &ldquo;세부지침&rdquo;이라고 합니다)의 규정에 따릅니다.</p>
  
  <p>제4조 (서비스의 가입)</p>
  
  <p>본회사는 아래와 같은 경우에는 여러분의 미션밥파서블 계정 생성을 유보할 수 있습니다.</p>
  
  <p>실명이 아니거나 다른 사람의 명의를 사용하는 등 허위로 신청하는 경우</p>
  
  <p>회원 등록 사항을 빠뜨리거나 잘못 기재하여 신청하는 경우</p>
  
  <p>기타 회사가 정한 이용신청 요건을 충족하지 않았을 경우</p>
  
  <p>제5조 (서비스의 해지)</p>
  
  <p>회원이 서비스 이용을 해지하고자 할 경우 회원은 회사가 정한 절차(서비스 홈페이지 등을 통해 공지합니다)를 통해 서비스 해지를 신청할 수 있으며, 회사는 법령이 정하는 바에 따라 신속히 처리합니다.</p>
  
  <p>제6조 (서비스의 내용)</p>
  
  <p>서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무 또는 기술상의 이유로 서비스가 일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에도 서비스는 일시 중지될 수 있습니다. 이때 회사는 사전 또는 사후에 이를 공지합니다.</p>
  
  <p>회사가 제공하는 서비스의 종류, 세부 내용, 이용 요금은 아래와 같습니다.</p>
  
  <p>종류 : 동네 외식장려 서비스</p>
  
  <p>서비스명 : 미션 밥파서블</p>
  
  <p>설명 : 회원이 설정한 동네 위치정보에 따라 주변 가게들로 미션이 추천되는 서비스</p>
  
  <p>위치정보 이용 목적: 주변가게로 미션 할당을 위한 위치정보 확인</p>
  
  <p>이용 요금 : 무료</p>
  
  <p>제7조 (서비스 이용요금)</p>
  
  <p>회사가 제공하는 서비스는 기본적으로 무료입니다.</p>
  
  <p>회원의 개인정보도용 및 결제사기로 인한 환불요청 또는 결제자의 개인정보 요구는 법률이 정한 경우 외에는 거절될 수 있습니다.</p>
  
  <p>무선서비스 이용 시 발생하는 데이터 통신료는 별도이며, 회원이 가입한 각 이동통신사의 정책에 따릅니다.</p>
  
  <p>MMS 등으로 리뷰를 등록할 경우 발생하는 요금은 회원이 가입한 각 이동통신사의 정책에 따릅니다.</p>
  
  <p>제8조 (서비스의 이용제한 및 중지)</p>
  
  <p>회사는 아래 각 호의 경우에는 회원의 서비스 이용을 제한하거나 중지시킬 수 있습니다.</p>
  
  <p>회원이 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우</p>
  
  <p>서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우</p>
  
  <p>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</p>
  
  <p>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때</p>
  
  <p>기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우</p>
  
  <p>회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간 등을 회원에게 알려야 합니다.</p>
  
  <p>제9조 (서비스내용변경 통지 등)</p>
  
  <p>회사가 서비스 내용을 변경하거나 종료하는 경우 회사는 회원의 등록된 휴대폰 번호 문자 방식(또는, 카카오톡 방식)으로 서비스 내용의 변경 사항 또는 종료를 통지할 수 있습니다.</p>
  
  <p>전항의 경우 불특정 다수인을 상대로 통지를 함에 있어서는 서비스 홈페이지 등 기타 회사의 공지사항 페이지를 통하여 회원들에게 통지할 수 있습니다. 단, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항은 상당한 기간 동안 서비스 홈페이지에 게시하거나 회원에게 전자적 형태(전자우편, SMS 등)로 개별통지 합니다.</p>
  
  <p>제10조 (개인위치정보의 이용 또는 제공)</p>
  
  <p>회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는 미리 약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다.</p>
  
  <p>회원 및 법정대리인의 권리와 그 행사방법은 제소 당시의 이용자의 주소에 의하며, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</p>
  
  <p>회사는 타사업자 또는 이용 고객과의 요금정산 및 민원처리를 위해 위치정보 이용&middot;제공, 사실 확인자료를 자동 기록&middot;보존하며, 해당 자료는 6개월간 보관합니다.</p>
  
  <p>회사는 개인위치정보주체의 동의 없이 개인위치정보를 제3자에게 제공하지 아니하며, 제3자 제공 서비스를 제공하는 경우에는 제공 받는자 및 제공목적을 사전에 개인위치정보주체에게 고지하고 동의를 받습니다. 다만, 다음의 경우는 예외로 하고 있습니다.</p>
  
  <p>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>
  
  <p>회사는 개인위치정보를 회원이 지정하는 제3자에게 제공하는 경우에는 개인위치정보를 수집한 당해 통신 단말장치로 매회 회원에게 제공받는 자, 제공 일시 및 제공목적을 즉시 통보합니다. 단, 아래 각 호의 1에 해당하는 경우에는 회원이 미리 특정하여 지정한 통신 단말장치 또는 전자우편주소로 통보합니다.</p>
  
  <p>개인위치정보를 수집한 당해 통신단말장치가 문자, 음성 또는 영상의 수신기능을 갖추지 아니한 경우.</p>
  
  <p>회원이 온라인 게시 등의 방법으로 통보할 것을 미리 요청한 경우.</p>
  
  <p>제11조 (개인위치정보주체의 권리)</p>
  
  <p>회원은 회사에 대하여 언제든지 개인위치정보를 이용한 위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다. 이 경우 회사는 수집한 개인위치정보 및 위치정보 이용, 제공사실 확인자료를 파기합니다.</p>
  
  <p>회원은 회사에 대하여 언제든지 개인위치정보의 수집, 이용 또는 제공의 일시적인 중지를 요구할 수 있으며, 회사는 이를 거절할 수 없고 이를 위한 기술적 수단을 갖추고 있습니다.</p>
  
  <p>회원은 회사에 대하여 아래 각 호의 자료에 대한 열람 또는 고지를 요구할 수 있고, 당해 자료에 오류가 있는 경우에는 그 정정을 요구할 수 있습니다. 이 경우 회사는 정당한 사유 없이 회원의 요구를 거절할 수 없습니다.</p>
  
  <p>본인에 대한 위치정보 수집, 이용, 제공사실 확인자료</p>
  
  <p>본인의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률 또는 다른 법률 규정에 의하여 제3자에게 제공된 이유 및 내용</p>
  
  <p>회원은 제1항 내지 제3항의 권리행사를 위해 회사의 소정의 절차를 통해 요구할 수 있습니다.</p>
  
  <p>제12조 (법정대리인의 권리)</p>
  
  <p>회사는 14세 미만의 회원에 대해서는 개인위치정보를 이용한 위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의를 당해 회원과 당해 회원의 법정대리인으로부터 동의를 받아야 합니다. 이 경우 법정대리인은 제11조에 의한 회원의 권리를 모두 가집니다.</p>
  
  <p>회사는 14세 미만의 아동의 개인위치정보 또는 위치정보 이용, 제공사실 확인자료를 이용약관에 명시 또는 고지한 범위를 넘어 이용하거나 제3자에게 제공하고자 하는 경우에는 14세 미만의 아동과 그 법정대리인의 동의를 받아야 합니다. 단, 아래의 경우는 제외합니다.</p>
  
  <p>위치정보 및 위치기반서비스 제공에 따른 요금정산을 위하여 위치정보 이용, 제공사실 확인자료가 필요한 경우</p>
  
  <p>통계작성, 학술연구 또는 시장조사를 위하여 특정 개인을 알아볼 수 없는 형태로 가공하여 제공하는 경우</p>
  
  <p>제13조 (8세 이하의 아동 등의 보호의무자의 권리)</p>
  
  <p>회사는 14세 미만의 아동의 개인위치정보 또는 위치정보 이용, 제공사실 확인자료를 이용약관에 명시 또는 고지한 범위를 넘어 이용하거나 제3자에게 제공하고자 하는 경우에는 14세 미만의 아동과 그 법정대리인의 동의를 받아야 합니다. 단, 아래의 경우는 제외합니다.</p>
  
  <p>8세 이하의 아동</p>
  
  <p>피성년후견인</p>
  
  <p>장애인복지법 제2조 제2항 제2호의 규정에 따른 정신적 장애를 가진 자로서 장애인 고용촉진 및 직업재활법 제2조 제2호의 규정에 따라 중증장애인에 해당하는 자(장애인복지법 제32조의 규정에 따라 장애인등록을 한 자에 한합니다)</p>
  
  <p>전항의 규정에 따른 8세 이하 아동 등의 보호의무자는 해당 아동을 사실상 보호하는 자로서 다음 각 호에 해당하는 자를 말합니다.</p>
  
  <p>8세 이하의 아동의 법정대리인 또는 보호시설에 있는 미성년자의 후견 직무에 관한 법률 제3조의 규정에 따른 후견인</p>
  
  <p>피성년후견인의 법정대리인</p>
  
  <p>본 조 제1항 제3호의 자의 법정대리인 또는 장애인복지법 제58조 제1항 제1호의 규정에 따른 장애인생활시설(국가 또는 지방자치단체가 설치&middot;운영하는 시설에 한합니다)의 장, 정신보건법 제3조 제4호의 규정에 따른 정신질환자 사회복귀시설(국가 또는 지방자치단체가 설치&middot;운영하는 시설에 한합니다)의 장, 동법 동조 제5호의 규정에 따른 정신요양시설의 장</p>
  
  <p>8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의 이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에 보호의무자임을 증명하는 서면을 첨부하여 회사에 제출하여야 합니다.</p>
  
  <p>보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에 동의하는 경우 개인위치정보주체 권리의 전부를 행사할 수 있습니다.</p>
  
  <p>제14조 (회사의 주소 및 연락처 등)</p>
  
  <p>회사의 상호, 주소 및 연락처는 아래와 같습니다.</p>
  
  <p>상호 : 밥플레이스</p>
  
  <p>대표 : 박승민</p>
  
  <p>주소 : 서울특별시 성북구 길음로119<br />
  이메일 : bobpossible0@naver.com</p>
  
  <p>대표전화 : 010-9805-8736</p>
  
  <p>회원의 서비스 받을 권리는 이를 양도 내지 증여하거나 담보제공 등의 목적으로 처분할 수 없습니다.</p>
  
  <p>제15조 (손해배상)</p>
  
  <p>회사가 위치정보법 제15조 내지 제26조의 규정을 위반한 행위로 회원에게 손해가 발생한 경우 회원은 회사에 대하여 손해배상 청구를 할 수 있습니다. 이 경우 회사는 고의, 과실이 없음을 입증하지 못하는 경우 책임을 면할 수 없습니다.</p>
  
  <p>회사가 위치정보법 제15조 내지 제26조의 규정을 위반한 행위로 회원에게 손해가 발생한 경우 회원은 회사에 대하여 손해배상 청구를 할 수 있습니다. 이 경우 회사는 고의, 과실이 없음을 입증하지 못하는 경우 책임을 면할 수 없습니다.</p>
  
  <p>제16조 (면책)</p>
  
  <p>회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.</p>
  
  <p>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</p>
  
  <p>서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우</p>
  
  <p>회원의 귀책사유로 서비스 이용에 장애가 있는 경우4) 제1호 내지 제3호를 제외한 기타 회사의 고의ㆍ과실이 없는 사유로 인한 경우</p>
  
  <p>회사는 서비스 및 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 아니합니다.</p>
  
  <p>제18조 (분쟁의 조정 및 기타)</p>
  
  <p>서비스 이용과 관련하여 회사와 회원 간에 분쟁이 발생하면, 회사는 분쟁의 해결을 위해 회원과 성실히 협의합니다.</p>
  
  <p>전항의 협의에서 분쟁이 해결되지 않은 경우 회사와 회원은 위치정보법 제28조에 의한 방송통신위원회에 재정을 신청하거나, 개인정보보호법 제43조에 의한 방송통신위원회 또는 개인정보분쟁조정위원회에 재정 또는 분쟁조정을 신청할 수 있습니다.</p>
  
  <p>전항으로도 분쟁이 해결되지 않으면 회사와 회원 양 당사자는 민사소송법상의 관할법원에 소를 제기할 수 있습니다.</p>
  
  <p>부칙</p>
  
  <p>제1조 (시행일) 본 약관은 2022년 7월 15일부터 시행합니다.</p>
  
  
  </body>
  </html>
  `,
};
const Contract4 = {
  html: `<html>

  <head>
  
  <meta charset="utf-8" />
  
  <title>Inline Style</title>
  <style type="text/css">
  
  p {color:#000000; font-size:14px;}
  ol {color:#000000; font-size:14px;}
  li {color:#000000; font-size:14px;}
  </style>
  </head>
  
  <body>
  
  <ol start="1">
    <li>개인정보 수집, 이용 항목</li>
  </ol>
  
  <p>이메일, 휴대전화번호, 성별, 생일, 연령대, 지역, CI(연계정보), DI(중복가입확인정보), 서비스 이용 기록, 접속 로그, 쿠키, 접속 ip 주소 기기정보(모델명, OS정보, 기기고유번호), 광고 ID</p>
  
  <ol start="2">
    <li>개인정보 수집, 이용 목적</li>
  </ol>
  
  <p>(광고성) 마케팅, 프로모션 및 혜택 소식 전송</p>
  
  <ol start="3">
    <li>개인정보 보유, 이용 기간</li>
  </ol>
  
  <p>회원탈퇴 시 또는 동의 철회 시 까지</p>
  
  <ol start="4">
    <li>동의 거부 권리 및 거부 시 불이익</li>
  </ol>
  
  <p>개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의를 거부 할 경우 회원가입 및 서비스 이용에 제한이 없으나 혜택 알림 등을 받으실 수 없습니다.</p>
  
  
  </body>
  </html>
  `,
};

const RegisterContract = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.modalHeader]}>
        <TouchableOpacity onPress={goBack}>
          <View style={[styles.backButton]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={[styles.storeHeaderText]}>이용 약관</Text>
        </View>

        <View style={[styles.backButton, {opacity: 0}]}>
          <Icon name="arrow-left" size={24} color="black" />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 16, marginVertical: 32, paddingBottom: 32}}
      >
        {route.params.type === 0 ? (
          <View style={{flex: 1}}>
            <Text style={{marginBottom: 12, color: '#111111'}}>서비스 이용약관</Text>
            <RenderHtml
              contentWidth={wp(calWidth(343))}
              source={Contract1}
              customHTMLElementModels={customHTMLElementModels}
            />
          </View>
        ) : route.params.type === 1 ? (
          <View style={{flex: 1}}>
            <Text style={{marginBottom: 12, color: '#111111'}}>개인정보 수집/이용 동의</Text>
            <RenderHtml
              contentWidth={wp(calWidth(343))}
              source={Contract2}
              customHTMLElementModels={customHTMLElementModels}
            />
          </View>
        ) : route.params.type === 2 ? (
          <View style={{flex: 1}}>
            <Text style={{marginBottom: 12, color: '#111111'}}>위치기반 서비스 이용약관</Text>
            <RenderHtml
              contentWidth={wp(calWidth(343))}
              source={Contract3}
              customHTMLElementModels={customHTMLElementModels}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={{marginBottom: 12, color: '#111111'}}>
              마케팅 목적 개인정보 수집 이용 및 수신동의{' '}
            </Text>
            <RenderHtml
              contentWidth={wp(calWidth(343))}
              source={Contract4}
              customHTMLElementModels={customHTMLElementModels}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  modalHeader: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  storeInfoWrap: {
    height: 100,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  storeHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});

export default RegisterContract;
