package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.JwtDetails;
import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class JwtMemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        MemberEntity memberEntity = memberRepository.findByEmail(email);
        log.info("email : " + memberEntity.getEmail());

        return new JwtDetails(memberEntity);
    }
}