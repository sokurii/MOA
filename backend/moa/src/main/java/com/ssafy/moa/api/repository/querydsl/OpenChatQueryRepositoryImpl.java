package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.OpenChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.ssafy.moa.api.entity.QOpenChat.openChat;
import static com.ssafy.moa.api.entity.QOpenChatMember.openChatMember;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class OpenChatQueryRepositoryImpl implements OpenChatQueryRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<OpenChatDto.OpenChatResponse> findOpenChatList() {
        return jpaQueryFactory
                .select(Projections.constructor(OpenChatDto.OpenChatResponse.class,
                        openChat.openChatId,
                        openChatMember.openChat.count(),
                        openChat.openChatTitle,
                        openChat.openChatContent,
                        openChat.openChatImgUrl))
                .from(openChat)
                .innerJoin(openChatMember).on(openChat.eq(openChatMember.openChat))
                .groupBy(openChat.openChatId)
                .fetch();
    }
}
