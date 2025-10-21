$(document).ready(function () {
    let list_count = 0
    let newTeamA = []
    let newTeamB = []
    let shuffle_count = 0
    let isFirstCheckForNames = true

    function dragFunction() {
        $('.list-container--team-a .list, .list-container--team-b .list').sortable({
            connectWith: '.names, .list-container--team-a .list, .list-container--team-b .list',
            helper: 'clone',
            placeholder: 'member-placeholder',
            tolerance: 'pointer',
            update: function (_event, _ui) {
                addRemoveButtons()
                addNumbering()
            },
        })

        let member_clicked_count = 1
        $(document).on('click', '.member', function (e) {
            if ($(e.target).closest('.remove-btn').length) return
            if ($(this).closest('.prepair').length) return
            if ($(this).closest('.list-container').length) return // 이미 팀에 속한 멤버는 제외

            const selectedMode = $('input[name="team"]:checked').val()

            if (selectedMode == 'a') {
                $(this).appendTo('.list-container--team-a .list')
            } else {
                $(this).appendTo('.list-container--team-b .list')
            }

            addRemoveButtons()
            addNumbering()

            if (member_clicked_count % 2 == 0) {
                $('.team-select--a').click()
            } else {
                $('.team-select--b').click()
            }
            member_clicked_count++
        })
    }

    function initMember() {
        const storedMembers = JSON.parse(localStorage.getItem('members')) || []
        if (storedMembers) {
            storedMembers.forEach((member) => {
                $('.names').append(
                    `<div class="member">${member} <div class="remove-btn"><span>×</span></div></div>`,
                )
                $('.indicator').css('display', 'flex')
                setTimeout(() => {
                    $('.indicator').fadeOut()
                }, 2000)
                isFirstCheckForNames = false
                // $('.step-1').addClass('hide')
                $('.step-2').removeClass('hide')
            })
        }
    }

    function addRemoveButtons() {
        // list-container 안의 member들에게 X버튼 추가 (이미 있는 경우 제외)
        $('.step-2 .member').each(function () {
            if (!$(this).find('.remove-btn').length) {
                const memberText = $(this).text()
                $(this).html(`${memberText}<div class="remove-btn"><span>×</span></div>`)
            }
        })

        // X버튼 클릭 이벤트
        $(document)
            .off('click', '.step-2 .remove-btn')
            .on('click', '.step-2 .remove-btn', function (e) {
                e.preventDefault()
                e.stopPropagation()

                const $member = $(this).parent()
                // list-container에서 제거
                $member.remove()
                $('.names').append($member)

                addNumbering()
            })
    }

    function addNumbering() {
        const teamALength = $('.list-container--team-a .list').children().length
        const teamBLength = $('.list-container--team-b .list').children().length

        list_count = Math.max(teamALength, teamBLength)

        $('.numbering').empty()
        for (let i = 1; i <= list_count; i++) {
            $('.numbering').append(`<div class='num'>${i}</div>`)
        }
    }

    function disableTouch() {
        let lastTouchEnd = 0
        document.addEventListener(
            'touchend',
            function (event) {
                const now = new Date().getTime()
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault()
                }
                lastTouchEnd = now
            },
            false,
        )
    }
    function shuffle() {
        // FAIR SHUFFLE 버튼 기능
        $('.shuffle').click(function () {
            $('.notice').empty()
            $('.shuffle').prop('disabled', true)
            $('.loading').show()
            shuffle_count++
            $('.count span').text(shuffle_count)

            newTeamA = []
            newTeamB = []

            let members_a = $('.list-container--team-a .list').children()
            let members_b = $('.list-container--team-b .list').children()

            for (let i = 0; i < list_count; i++) {
                let randomkey = Math.floor(Math.random() * 2)

                $(members_a[i]).children('.remove-btn').remove()
                $(members_b[i]).children('.remove-btn').remove()

                if (randomkey === 0) {
                    newTeamA.push(members_a[i] ? members_a[i].innerText : 'empty')
                    newTeamB.push(members_b[i] ? members_b[i].innerText : 'empty')
                } else {
                    newTeamA.push(members_b[i] ? members_b[i].innerText : 'empty')
                    newTeamB.push(members_a[i] ? members_a[i].innerText : 'empty')
                }
            }

            setTimeout(() => {
                // reset team-a,team-b
                $('.list-container--team-a .list').empty()
                $('.list-container--team-b .list').empty()

                newTeamA.forEach((member) => {
                    if (member !== 'empty') {
                        $('.list-container--team-a .list').append(
                            `<div class='member ui-sortable-handle'>${member}<div class="remove-btn"><span>×</span></div></div>`,
                        )
                    }
                })
                newTeamB.forEach((member) => {
                    if (member !== 'empty') {
                        $('.list-container--team-b .list').append(
                            `<div class='member ui-sortable-handle'>${member}<div class="remove-btn"><span>×</span></div></div>`,
                        )
                    }
                })

                addRemoveButtons()
                $('.shuffle').prop('disabled', false)
                $('.loading').fadeOut()
                notice()
            }, 200)
        })
    }

    let noticeTimeout = null
    function notice() {
        if (noticeTimeout) {
            clearTimeout(noticeTimeout)
            noticeTimeout = null
        }
        $('.notice').show()
        $('.notice').html(`팀을 섞었습니다 <span class='count'>(${shuffle_count})</span>`)
        noticeTimeout = setTimeout(() => {
            $('.notice').fadeOut()
        }, 1000)
    }

    function addMemberWithKeybaord() {
        $(document).on('keydown', function (e) {
            if (e.metaKey && e.key === 'Enter') {
                $('.add-member').click()
            }
        })
    }

    function addMember() {
        const names = $('.add-member-names')
            .val()
            .split('\n')
            .map((name) => name.trim())
            .filter((name) => name)

        names.forEach((name) => {
            $('.names').append(
                `<div class="member">${name}<div class='remove-btn'><span>×</span></div></div>`,
            )
            if (!localStorage.getItem('members')) {
                localStorage.setItem('members', JSON.stringify([name]))
            } else {
                const members = JSON.parse(localStorage.getItem('members'))
                members.push(name)
                localStorage.setItem('members', JSON.stringify(members))
            }
        })

        if ($('.names .member').length > 0) {
            $('.step-2').removeClass('hide')
        }

        $('.add-member-names').val('')
        dragFunction()

        if (!isFirstCheckForNames) return
        if (names.length <= 0) return

        $('.indicator').css('display', 'flex')
        setTimeout(() => {
            $('.indicator').fadeOut()
            isFirstCheckForNames = false
        }, 2000)
    }

    function addMemberClick() {
        $('.add-member').click(addMember)

        const list = $('.list .member')

        // oxlint-disable-next-line no-unused-expressions
        list.length > 0
            ? (function () {
                  $('.step-2').removeClass('hide')
              })()
            : $('.step-2').addClass('hide')
    }

    function reset() {
        $('.reset').click(function () {
            window.location.reload()
        })
    }

    function removeMember() {
        $(document).on('click', '.step-1 .remove-btn', function () {
            let localMembers = JSON.parse(localStorage.getItem('members'))
            let clickedMember = $(this).closest('.member')
            clickedMember.find('.remove-btn').remove()

            let clickedMemberName = clickedMember.text().trim()

            let removeIndex = localMembers.indexOf(clickedMemberName)
            if (removeIndex !== -1) {
                localMembers.splice(removeIndex, 1)
                localStorage.setItem('members', JSON.stringify(localMembers))
            }
            clickedMember.remove()
        })
    }

    function makebodyCentered() {
        if (innerHeight <= $('body').height(true)) {
            $('body').css({
                display: 'block',
                minHeight: `auto`,
            })
        } else {
            $('body').css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: `100vh`,
            })
        }
    }

    dragFunction()
    addNumbering()
    disableTouch()
    shuffle()
    addMemberWithKeybaord()
    addMemberClick()
    initMember()
    reset()
    removeMember()
    makebodyCentered()

    $(document).on('click', '.indicator', function () {
        $(this).fadeOut()
    })

    $(window).on('resize', makebodyCentered)
})
